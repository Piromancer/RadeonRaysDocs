rrDestroyContext
================

Destroys RR API context.

Destroys all the global resources used by the RR session. Further calls with this context are prohibited.
  
.. cssclass:: api-code-block

.. list-table:: 
   :widths: 25 75

   * - :doc:`RRError <../info_setting_types/rrerror>` rrDestroyContext(
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
        - context
        - input
        - API context.



Return
++++++

Returns an :doc:`error <../info_setting_types/rrerror>` in case of a failure, or :doc:`RR_Success <../info_setting_types/rrerror>` otherwise.

