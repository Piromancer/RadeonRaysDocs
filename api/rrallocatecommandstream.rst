rrAllocateCommandStream
=======================

Allocates command stream.
  
.. cssclass:: api-code-block

.. list-table:: 
   :widths: 25 75

   * - :doc:`RRError <../info_setting_types/rrerror>` rrAllocateCommandStream(
     - :doc:`RRContext <../data_types>` context,
   * -
     - :doc:`RRCommandStream <../data_types>`\* command_stream);

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
        - output
        - Resulting command stream.



Return
++++++

Returns an :doc:`error <../info_setting_types/rrerror>` in case of a failure, or :doc:`RR_Success <../info_setting_types/rrerror>` otherwise.

