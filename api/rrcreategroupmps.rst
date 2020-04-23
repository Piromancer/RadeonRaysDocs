rrCreateGroupMPS
================

Creates MPS group to combine geometries with scenes.

Should be passed as ``backend_specific_info`` to build API functions.
  
.. cssclass:: api-code-block

.. list-table:: 
   :widths: 25 75

   * - :doc:`RRError <../info_setting_types/rrerror>` rrCreateGroupMPS(
     - :doc:`RRContext <../data_types>`\* context,
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
        - RR context.
		
    *
        - device_ptr
        - output
        - RR device pointer to group.



Return
++++++

Returns an :doc:`error <../info_setting_types/rrerror>` in case of a failure, or :doc:`RR_Success <../info_setting_types/rrerror>` otherwise.

