rrCreateContext
===============

Creates RR API context.

All RR functions expect context as their first argument. Context keeps global data required by an RR session. 

Calls made from different threads with different RR contexts are safe. Calls with the same context should be externally synchronized by the client.
  
.. cssclass:: api-code-block

.. list-table:: 
   :widths: 25 75

   * - :doc:`RRError <../info_setting_types/rrerror>` rrCreateContext(
     - uint32_t api_version,
   * - 
     - :doc:`RRApi <../info_setting_types/rrapi>` api,
   * -
     - :doc:`RRContext <../data_types>`\* context);
	 
Applies to
++++++++++

All supported backends

	 

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
        - api
        - input
        - Backend type.

    *
        - context
        - output
        - Created context.



Return
++++++

Returns an :doc:`error <../info_setting_types/rrerror>` in case of a failure, or :doc:`RR_Success <../info_setting_types/rrerror>` otherwise.

