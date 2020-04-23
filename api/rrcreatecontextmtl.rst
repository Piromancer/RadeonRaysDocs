rrCreateContextMTL
==================

Create context from existing Metal device.
  
.. cssclass:: api-code-block

.. list-table:: 
   :widths: 25 75

   * - :doc:`RRError <../info_setting_types/rrerror>` rrCreateContextMTL(
     - uint32_t api_version,
   * - 
     - id<MTLDevice> device,
   * - 
     - id<MTLCommandQueue> command_queue,
   * -
     - :doc:`RRContext <../data_types>`\* context);
	 

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
        - api_version
        - input
        - API version.
		
    *
        - device
        - input
        - Metal device to use.

    *
        - command_queue
        - input
        - Metal command queue for the context.

    *
        - context
        - output
        - RR context.


Return
++++++

Returns an :doc:`error <../info_setting_types/rrerror>` in case of a failure, or :doc:`RR_Success <../info_setting_types/rrerror>` otherwise.

