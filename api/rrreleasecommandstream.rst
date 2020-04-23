rrReleaseCommandStream
======================

Releases command stream.
  
.. cssclass:: api-code-block

.. list-table:: 
   :widths: 25 75

   * - :doc:`RRError <../info_setting_types/rrerror>` rrReleaseCommandStream(
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
        - input
        - Command stream to release.



Return
++++++


Returns an :doc:`error <../info_setting_types/rrerror>` in case of a failure, or :doc:`RR_Success <../info_setting_types/rrerror>` otherwise.

