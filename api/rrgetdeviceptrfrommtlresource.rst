rrGetDevicePtrFromMTLResource
=============================
	
Obtains device pointer from Metal buffer.
  
.. cssclass:: api-code-block

.. list-table:: 
   :widths: 25 75

   * - :doc:`RRError <../info_setting_types/rrerror>` rrGetDevicePtrFromMTLResource(
     - :doc:`RRContext <../data_types>` context,
   * - 
     - id<MTLBuffer> resource,
   * -
     - size_t offset,
   * -
     - :doc:`RRDevicePtr <../data_types>`\* device_ptr);


Applies to
++++++++++

Metal 

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
        - Metal resource to request pointer to.
		
    *
        - offset
        - input
        - Offset within a buffer.
		
    *
        - device_ptr
        - output
        - RR device pointer to the resource.



Return
++++++

Returns an :doc:`error <../info_setting_types/rrerror>` in case of a failure, or :doc:`RR_Success <../info_setting_types/rrerror>` otherwise.

