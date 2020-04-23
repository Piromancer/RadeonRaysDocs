rrGetDevicePtrFromD3D12Resource
===============================
	

Obtains device pointer from D3D12 buffer.
  
.. cssclass:: api-code-block

.. list-table:: 
   :widths: 25 75

   * - :doc:`RRError <../info_setting_types/rrerror>` rrGetDevicePtrFromD3D12Resource(
     - :doc:`RRContext <../data_types>` context,
   * - 
     - ID3D12Resource* resource,
   * -
     - size_t offset,
   * -
     - :doc:`RRDevicePtr <../data_types>`\* device_ptr);


Applies to
++++++++++

DirectX 

Parameters
++++++++++

.. cssclass:: full-width

.. list-table::
    :widths: 20 15 65
    :header-rows: 1

    *
        - Parameter
        - Input/Output
        - Description

    *
        - context
        - input
        - RR API context.

    *
        - resource
        - input
        - D3D12 resource to request pointer to.
		
    *
        - offset
        - input
        - Offset within a buffer.
		
    *
        - device_ptr
        - output
        - Asm device pointer to the resource.



Return
++++++

Returns an :doc:`error <../info_setting_types/rrerror>` in case of a failure, or :doc:`RR_Success <../info_setting_types/rrerror>` otherwise.

