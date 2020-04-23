Basic Example for DirectX
=========================

The following walkthrough is a basic example for the DirectX backend.

.. code-block:: cpp

	void BuildUpdateTrace()
	{

1. Create the default DirectX context.

   .. code-block:: cpp

		RRContext context = nullptr;
		CHECK_RR_CALL(rrCreateContextDxCompute(RR_API_VERSION, dxassist_.device(), dxassist_.command_queue(), &context));

		auto     device = dxassist_.device();
		
2. Upload mesh information from a file to DirectX buffers.

   .. code-block:: cpp
   
		MeshData mesh_data("example.obj");
		auto vertex_buffer =
			dxassist_.CreateUploadBuffer(sizeof(float) * mesh_data.positions.size(), mesh_data.positions.data());
		auto index_buffer =
			dxassist_.CreateUploadBuffer(sizeof(std::uint32_t) * mesh_data.indices.size(), mesh_data.indices.data());

		RRDevicePtr vertex_ptr = nullptr;
		RRDevicePtr index_ptr  = nullptr;

3. Get RR device pointers to these resources.

   .. code-block:: cpp
   
		rrGetDevicePtrFromD3D12Resource(context, vertex_buffer.Get(), 0, &vertex_ptr);
		rrGetDevicePtrFromD3D12Resource(context, index_buffer.Get(), 0, &index_ptr);

4. Fill out the build input.

   .. code-block:: cpp
   
		auto triangle_count = static_cast<UINT>(index_buffer->GetDesc().Width) / sizeof(UINT32) / 3;
		RRGeometryBuildInput    geometry_build_input            = {};
		RRTriangleMeshPrimitive mesh                            = {};
		geometry_build_input.triangle_mesh_primitives           = &mesh;
		geometry_build_input.primitive_type                     = RR_PRIMITIVE_TYPE_TRIANGLE_MESH;
		geometry_build_input.triangle_mesh_primitives->vertices = vertex_ptr;
		geometry_build_input.triangle_mesh_primitives->vertex_count =
			static_cast<UINT>(vertex_buffer->GetDesc().Width) / (3 * sizeof(float));

		geometry_build_input.triangle_mesh_primitives->vertex_stride    = 3 * sizeof(float);
		geometry_build_input.triangle_mesh_primitives->triangle_indices = index_ptr;
		geometry_build_input.triangle_mesh_primitives->triangle_count   = (UINT)triangle_count;
		geometry_build_input.triangle_mesh_primitives->index_type       = RR_INDEX_TYPE_UINT32;
		geometry_build_input.primitive_count                            = 1u;

		std::cout << "Triangle count " << triangle_count << "\n";

4. We plan to do update, so add this flag along with the fast build flag.

   .. code-block:: cpp
   
		RRBuildOptions options;
		options.build_flags = RR_BUILD_FLAG_BITS_ALLOW_UPDATE | RR_BUILD_FLAG_BITS_PREFER_FAST_BUILD;

5. Get requirements for building.

   .. code-block:: cpp
   
		RRMemoryRequirements geometry_reqs;
		CHECK_RR_CALL(rrGetGeometryBuildMemoryRequirements(context, &geometry_build_input, &options, &geometry_reqs));

		D3D12_RESOURCE_STATES initialResourceState = D3D12_RESOURCE_STATE_RAYTRACING_ACCELERATION_STRUCTURE;

6. Geometry DirectX buffer with UAV.

   .. code-block:: cpp
   
		auto geometry = dxassist_.CreateUAVBuffer(geometry_reqs.result_buffer_size);
		std::cout << "Geometry buffer size: " << geometry_reqs.result_buffer_size / 1000000 << "Mb\n";

7. Get RR device pointer for geometry.

   .. code-block:: cpp
   
		RRDevicePtr geometry_ptr;
		CHECK_RR_CALL(rrGetDevicePtrFromD3D12Resource(context, geometry.Get(), 0, &geometry_ptr));

8. Scratch DirectX buffer with UAV.

   .. code-block:: cpp
   
		auto scratch_buffer = dxassist_.CreateUAVBuffer(
			max(geometry_reqs.temporary_build_buffer_size, geometry_reqs.temporary_update_buffer_size));
		std::cout << "Scratch buffer size: "
				  << max(geometry_reqs.temporary_build_buffer_size, geometry_reqs.temporary_update_buffer_size) / 1000000
				  << "Mb\n";

9. Get RR device pointer for scratch.

   .. code-block:: cpp
   
		RRDevicePtr scratch_ptr = nullptr;
		CHECK_RR_CALL(rrGetDevicePtrFromD3D12Resource(context, scratch_buffer.Get(), 0, &scratch_ptr));

10. Allocate a new command stream for building.

    .. code-block:: cpp
   
		RRCommandStream command_stream = nullptr;
		CHECK_RR_CALL(rrAllocateCommandStream(context, &command_stream));

		CHECK_RR_CALL(rrCmdBuildGeometry(
			context, RR_BUILD_OPERATION_BUILD, &geometry_build_input, &options, scratch_ptr, geometry_ptr, command_stream));

		RREvent wait_event = nullptr;
		CHECK_RR_CALL(rrSumbitCommandStream(context, command_stream, nullptr, &wait_event));
		CHECK_RR_CALL(rrWaitEvent(context, wait_event));

11. Update vertex data.

    .. code-block:: cpp
	
		float* vptr = nullptr;
		vertex_buffer->Map(0, nullptr, (void**)&vptr);

		for (uint32_t i = 0; i < mesh_data.positions.size() / 3; ++i)
		{
			vptr[3 * i + 1] -= 40.f;
		}

		vertex_buffer->Unmap(0, nullptr);
		CHECK_RR_CALL(rrReleaseEvent(context, wait_event));
		CHECK_RR_CALL(rrReleaseCommandStream(context, command_stream));

12. New command stream for update.

    .. code-block:: cpp
	
		CHECK_RR_CALL(rrAllocateCommandStream(context, &command_stream));

13. Run geometry build with the ``RR_BUILD_OPERATION_UPDATE`` option.

    .. code-block:: cpp
	
		CHECK_RR_CALL(rrCmdBuildGeometry(context,
		                                 RR_BUILD_OPERATION_UPDATE,
		                                 &geometry_build_input,
		                                 &options,
		                                 scratch_ptr,
		                                 geometry_ptr,
		                                 command_stream));
		CHECK_RR_CALL(rrSumbitCommandStream(context, command_stream, nullptr, &wait_event));
		CHECK_RR_CALL(rrWaitEvent(context, wait_event));

14. Prepare for trace.

    .. code-block:: cpp
	
		auto command_allocator = dxassist_.CreateCommandAllocator();
		auto command_list      = dxassist_.CreateCommandList(command_allocator.Get());

		auto shader =
			ShaderCompiler::instance().CompileFromFile("raytrace_bvh2.hlsl", "cs_6_2", "TraceRays");

		enum RootSignature
		{
			kConstants,
			kVertices,
			kIndices,
			kBvh,
			kOutput,
			kEntryCount
		};
	
		struct Constants
		{
			std::uint32_t width;
			std::uint32_t height;
			std::uint32_t triangle_count;
			std::uint32_t padding;
		};
		
15. Create root signature.

    .. code-block:: cpp

		CD3DX12_ROOT_PARAMETER root_entries[RootSignature::kEntryCount] = {};
		root_entries[kConstants].InitAsConstants(sizeof(Constants) >> 2, 0);
		root_entries[kVertices].InitAsUnorderedAccessView(0);
		root_entries[kIndices].InitAsUnorderedAccessView(1);
		root_entries[kBvh].InitAsUnorderedAccessView(2);
		root_entries[kOutput].InitAsUnorderedAccessView(3);

		CD3DX12_ROOT_SIGNATURE_DESC root_signature_desc;
		root_signature_desc.Init(RootSignature::kEntryCount, root_entries);

		ComPtr<ID3DBlob>   error_blob          = nullptr;
		ComPtr<ID3D10Blob> root_signature_blob = nullptr;

		if (FAILED(D3D12SerializeRootSignature(
				&root_signature_desc, D3D_ROOT_SIGNATURE_VERSION_1_0, &root_signature_blob, &error_blob)))
		{
			if (error_blob)
			{
				std::string error_str(static_cast<const char*>(error_blob->GetBufferPointer()));
				throw std::runtime_error(error_str);
			} else
			{
				throw std::runtime_error("Failed to serialize root signature");
			}
		}

		ComPtr<ID3D12RootSignature> root_signature;
		ThrowIfFailed(dxassist_.device()->CreateRootSignature(0,
															  root_signature_blob->GetBufferPointer(),
															  root_signature_blob->GetBufferSize(),
															  IID_PPV_ARGS(&root_signature)),
					  "Failed to create root signature");

		ComPtr<ID3D12PipelineState>       pipeline_state;
		D3D12_COMPUTE_PIPELINE_STATE_DESC desc = {};
		desc.pRootSignature                    = root_signature.Get();
		desc.CS                                = shader;
		desc.Flags                             = D3D12_PIPELINE_STATE_FLAG_NONE;
		ThrowIfFailed(dxassist_.device()->CreateComputePipelineState(&desc, IID_PPV_ARGS(&pipeline_state)),
					  "Cannot create compute pipeline");

		Constants constants{2048, 2048, (std::uint32_t)triangle_count, 0};

		auto color = dxassist_.CreateUploadBuffer(constants.width * constants.height * sizeof(UINT));

16. Bind resources.

    .. code-block:: cpp
	
		command_list->SetComputeRootSignature(root_signature.Get());
		command_list->SetPipelineState(pipeline_state.Get());
		command_list->SetComputeRoot32BitConstants(RootSignature::kConstants, sizeof(Constants) >> 2, &constants, 0);
		command_list->SetComputeRootUnorderedAccessView(RootSignature::kVertices, vertex_buffer->GetGPUVirtualAddress());
		command_list->SetComputeRootUnorderedAccessView(RootSignature::kIndices, index_buffer->GetGPUVirtualAddress());
		command_list->SetComputeRootUnorderedAccessView(RootSignature::kBvh, geometry->GetGPUVirtualAddress());
		command_list->SetComputeRootUnorderedAccessView(RootSignature::kOutput, color->GetGPUVirtualAddress());

17. Record shading.

    .. code-block:: cpp
	
		command_list->Dispatch(constants.width / 8, constants.height / 8, 1);
		command_list->Close();

18. Sync with CPU.

    .. code-block:: cpp
	
		ID3D12CommandList* cmd_lists[] = {command_list.Get()};
		dxassist_.command_queue()->ExecuteCommandLists(1, cmd_lists);
		auto fence = dxassist_.CreateFence();
		dxassist_.command_queue()->Signal(fence.Get(), 1000);
		while (fence->GetCompletedValue() != 1000) Sleep(0);

19. Get the picture from the DirectX buffer.

    .. code-block:: cpp
	
		{
			void* mapped_ptr;
			color->Map(0, nullptr, &mapped_ptr);

			stbi_write_jpg("test_dx_compute_updateobj_result.jpg", constants.width, constants.height, 4, mapped_ptr, 120);

			color->Unmap(0, nullptr);
		}

20. Release resources.

    .. code-block:: cpp
	
		CHECK_RR_CALL(rrReleaseEvent(context, wait_event));
		CHECK_RR_CALL(rrReleaseCommandStream(context, command_stream));
		CHECK_RR_CALL(rrDestroyContext(context));
	 }