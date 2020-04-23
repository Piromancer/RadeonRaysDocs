rrSubmitCommandStream
=====================

Submits command stream.
  
.. cssclass:: api-code-block

.. list-table:: 
   :widths: 25 75

   * - :doc:`RRError <../info_setting_types/rrerror>` rrSumbitCommandStream(
     - :doc:`RRContext <../data_types>` context,
   * -
     - :doc:`RRCommandStream <../data_types>` command_stream,
   * -
     - :doc:`RREvent <../data_types>` wait_event,
   * -
     - :doc:`RREvent <../data_types>`\* out_event);

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
        - context
        - input
        - RR API context.
		
    *
        - command_stream
        - input
        - Command stream to execute.
			
    *
        - wait_event
        - input
        - Event to wait for.	
		
    *
        - out_event
        - output
        - Event for this submission.



Return
++++++

Returns an :doc:`error <../info_setting_types/rrerror>` in case of a failure, or :doc:`RR_Success <../info_setting_types/rrerror>` otherwise.

