Basic Example for Metal
=======================

The following walkthrough is a basic example for the Metal backend.

``CHECK_RR_CALL`` is a macro asserting RadeonRays calls finished with ``RR_SUCCESS``.

.. code-block:: cpp

		void Build2LvlScene()
		{
			auto device = ChooseDevice();
			auto cmd_queue = [device newCommandQueue];

1. Create a library context.

   .. code-block:: cpp

		RRContext context = nullptr;
		CHECK_RR_CALL(rrCreateContextMTL(RR_API_VERSION, device, cmd_queue, &context));

2. Load shapes from a file.

   .. code-block:: cpp

		MeshData mesh_data("example.obj");

3. Load indices and vertices to MTL buffers.

   .. code-block:: cpp
   
		size_t vertex_size = sizeof(float) * mesh_data.positions.size();
		size_t indices_size = sizeof(uint32_t) * mesh_data.indices.size();

		id<MTLBuffer> indices_buf = [device newBufferWithLength:indices_size options:MTLResourceStorageModeManaged];
		memcpy(indices_buf.contents, mesh_data.indices.data(), indices_buf.length);
		id<MTLBuffer> vertices_buf = [device newBufferWithLength:vertex_size options:MTLResourceStorageModeManaged];
		memcpy(vertices_buf.contents, mesh_data.positions.data(), vertices_buf.length);

4. Update buffers and get a RadeonRays device pointer wrapper to use it in the library.

   .. code-block:: cpp
   
		[indices_buf didModifyRange:NSMakeRange(0, indices_buf.length)];
		[vertices_buf didModifyRange:NSMakeRange(0, vertices_buf.length)];

		RRDevicePtr vertex_ptr = nullptr;
		RRDevicePtr index_ptr  = nullptr;
		CHECK_RR_CALL(rrGetDevicePtrFromMTLResource(context, vertices_buf, 0, &vertex_ptr));
		CHECK_RR_CALL(rrGetDevicePtrFromMTLResource(context, indices_buf, 0, &index_ptr));

5. Set geometry build info.

   .. code-block:: cpp
   
		RRGeometryBuildInput    geometry_build_input            = {};
		RRTriangleMeshPrimitive mesh                            = {};
		geometry_build_input.triangle_mesh_primitives           = &mesh;
		geometry_build_input.primitive_type                     = RR_PRIMITIVE_TYPE_TRIANGLE_MESH;
		geometry_build_input.triangle_mesh_primitives->vertices = vertex_ptr;
		geometry_build_input.triangle_mesh_primitives->vertex_count = mesh_data.positions.size() / 3;
		geometry_build_input.triangle_mesh_primitives->vertex_stride    = 3 * sizeof(float);
		geometry_build_input.triangle_mesh_primitives->triangle_indices = index_ptr;
		geometry_build_input.triangle_mesh_primitives->triangle_count = mesh_data.indices.size() / 3;
		geometry_build_input.triangle_mesh_primitives->index_type = RR_INDEX_TYPE_UINT32;
		geometry_build_input.primitive_count                      = 1;

6. Create Metal performance shaders specific for a group acceleration structure to combine geometries and scenes.
   
   .. code-block:: cpp
   
		RRDevicePtr group_ptr = nullptr;
		CHECK_RR_CALL(rrCreateGroupMPS(context, &group_ptr));
		
7. Group goes to backend-specific info.

   .. code-block:: cpp
   
		RRBuildOptions options;
		options.build_flags = RR_BUILD_FLAG_BITS_ALLOW_UPDATE;
		options.backend_specific_info = group_ptr;
		RRDevicePtr geometry_ptr = nullptr;
		CHECK_RR_CALL(rrGetDevicePtrFromMTLResource(context, nullptr, 0, &geometry_ptr));

8. Create a command stream to build an acceleration structure.

   .. code-block:: cpp
   
		RRCommandStream build_geom_command_stream = nullptr;
		CHECK_RR_CALL(rrAllocateCommandStream(context, &build_geom_command_stream));

9. Register a build command.

   .. code-block:: cpp
   
		CHECK_RR_CALL(rrCmdBuildGeometry(
			context, RR_BUILD_OPERATION_BUILD, &geometry_build_input, &options, nullptr, geometry_ptr, build_geom_command_stream));

		RREvent wait_event = nullptr;
		CHECK_RR_CALL(rrSumbitCommandStream(context, build_geom_command_stream, nullptr, &wait_event));

   Wait until completed.

   .. code-block:: cpp
	
		CHECK_RR_CALL(rrWaitEvent(context, wait_event));
		CHECK_RR_CALL(rrReleaseEvent(context, wait_event));
		CHECK_RR_CALL(rrReleaseCommandStream(context, build_geom_command_stream));

10. Allocate another command stream to build a 2 level acceleration structure.

    .. code-block:: cpp
	
		RRCommandStream build_scene_command_stream = nullptr;
		CHECK_RR_CALL(rrAllocateCommandStream(context, &build_scene_command_stream));

		RREvent wait_scene_event = nullptr;
		RRDevicePtr scene_ptr = nullptr;
		CHECK_RR_CALL(rrGetDevicePtrFromMTLResource(context, nullptr, 0, &scene_ptr));

11. It is a simple example so we are using just one instance and unit transform.

    .. code-block:: cpp
	
		RRInstance instance = {geometry_ptr, {1.f, 0.f, 0.f, 0.f, 0.f, 1.f, 0.f, 0.f, 0.f, 0.f, 1.f, 0.f}};
		RRSceneBuildInput scene_build_input = {&instance, 1};

12. Register a build command in the command stream.

    .. code-block:: cpp
	
		CHECK_RR_CALL(rrCmdBuildScene(
			context, &scene_build_input, &options, nullptr, scene_ptr, build_scene_command_stream));

		CHECK_RR_CALL(rrSumbitCommandStream(context, build_scene_command_stream, nullptr, &wait_scene_event));

    Wait until completed.

    .. code-block:: cpp
	
		CHECK_RR_CALL(rrWaitEvent(context, wait_scene_event));
		CHECK_RR_CALL(rrReleaseEvent(context, wait_scene_event));
		CHECK_RR_CALL(rrReleaseCommandStream(context, build_scene_command_stream));

13. Now we can trace.

    .. code-block:: cpp
	
		using Ray = MPSRayOriginMinDistanceDirectionMaxDistance;
		using Hit = MPSIntersectionDistancePrimitiveIndexInstanceIndexCoordinates;
		RRCommandStream trace_command_stream = nullptr;
		CHECK_RR_CALL(rrAllocateCommandStream(context, &trace_command_stream));

		constexpr uint32_t kResolution = 640;

14. Generate rays.

    .. code-block:: cpp
	
		std::vector<Ray> rays(kResolution * kResolution);
		std::vector<Hit> hits(kResolution * kResolution);

		for (int x = 0; x < kResolution; ++x)
		{
			for (int y = 0; y < kResolution; ++y)
			{
				auto i = kResolution * y + x;

				rays[i].origin[0] = 0.f;
				rays[i].origin[1] = 15.f;
				rays[i].origin[2] = 0.f;

				rays[i].direction[0] = -1.f;
				rays[i].direction[1] = -1.f + (2.f / kResolution) * y;
				rays[i].direction[2] = -1.f + (2.f / kResolution) * x;

				rays[i].minDistance = 0.001f;
				rays[i].maxDistance = 100000.f;
				hits[i].distance = 1.0f;
			}
		}
		size_t rays_size = sizeof(Ray) * rays.size();
		size_t hits_size = sizeof(Hit) * hits.size();

15. Create MTL buffers for trace.

    .. code-block:: cpp
	
		id<MTLBuffer> rays_buf = [device newBufferWithLength:rays_size options:MTLResourceStorageModeManaged];
		memcpy(rays_buf.contents, rays.data(), rays_buf.length);
		[rays_buf didModifyRange:NSMakeRange(0, rays_buf.length)];
		id<MTLBuffer> hits_buf = [device newBufferWithLength:hits_size options:MTLResourceStorageModeShared];
		
		RRDevicePtr rays_ptr = nullptr;
		RRDevicePtr hits_ptr  = nullptr;
		CHECK_RR_CALL(rrGetDevicePtrFromMTLResource(context, rays_buf, 0, &rays_ptr));
		CHECK_RR_CALL(rrGetDevicePtrFromMTLResource(context, hits_buf, 0, &hits_ptr));

16. Encode trace command.

    .. code-block:: cpp
	
		CHECK_RR_CALL(rrCmdIntersect(context,
                                             scene_ptr,
                                             RR_INTERSECT_QUERY_CLOSEST,
                                             rays_ptr,
                                             kResolution * kResolution,
                                             nullptr,
                                             RR_INTERSECT_QUERY_OUTPUT_FULL_HIT,
                                             hits_ptr,
                                             trace_command_stream));
		RREvent trace_wait_event = nullptr;
		CHECK_RR_CALL(rrSumbitCommandStream(context, trace_command_stream, nullptr, &trace_wait_event));

		CHECK_RR_CALL(rrWaitEvent(context, trace_wait_event));
		CHECK_RR_CALL(rrReleaseEvent(context, trace_wait_event));
		CHECK_RR_CALL(rrReleaseCommandStream(context, trace_command_stream));

17. Update buffer.

    .. code-block:: cpp
	
		memcpy(hits.data(), hits_buf.contents, hits_buf.length);
		std::vector<uint32_t> data(kResolution * kResolution);

18. Prepare output.

    .. code-block:: cpp
	
		for (int y = 0; y < kResolution; ++y)
		{
			for (int x = 0; x < kResolution; ++x)
			{
				int wi = kResolution * (kResolution - 1 - y) + x;
				int i  = kResolution * y + x;

				if (hits[i].distance >= 0.f)
				{
					data[wi] = 0xff000000 | (uint32_t(hits[i].coordinates[0] * 255) << 8) |
							   (uint32_t(hits[i].coordinates[1] * 255) << 16);
				} else
				{
					 data[wi] = 0xff101010;
				}
			}
		}
		stbi_write_jpg("example_mtl_scene.jpg", kResolution, kResolution, 4, data.data(), 120);

19. Release resources.

    .. code-block:: cpp
	
		CHECK_RR_CALL(rrDestroyContext(context));
	}

