rrCmdIntersect
==============

Intersects ray buffer.
  
.. cssclass:: api-code-block

.. list-table:: 
   :widths: 25 75

   * - :doc:`RRError <../info_setting_types/rrerror>` rrCmdIntersect(
     - :doc:`RRContext <../data_types>` context,
   * - 
     - :doc:`RRDevicePtr <../data_types>` scene_buffer,
   * -
     - :doc:`RRIntersectQuery <../info_setting_types/rrintersectquery>` query,
   * -
     - :doc:`RRDevicePtr <../data_types>` rays,
   * -
     - uint32_t ray_count,
   * -
     - :doc:`RRDevicePtr <../data_types>` indirect_ray_count,
   * -
     - :doc:`RRIntersectQueryOutput <../info_setting_types/rrintersectqueryoutput>` query_output,
   * -
     - :doc:`RRDevicePtr <../data_types>` hits,
   * -
     - :doc:`RRCommandStream <../data_types>` command_stream);

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
        - scene
        - input
        - Scene to raycast against.

    *
        - query
        - input
        - Query type (clsosest or first).
		
    *
        - rays
        - input
        - Buffer of rays.
		
    *
        - ray_count
        - input
        - Number of rays in the buffer (or max number of rays if ``indirect_ray_count`` is supplied).
		
    *
        - indirect_ray_count
        - input
        - Optional actual number of rays in the buffer.
		
    *
        - query_output
        - input
        - Type of the information to output.

    *
        - hits
        - output
        - Output hits buffer.
		
    *
        - command_stream
        - input
        - Command stream to write command to.



Return
++++++

Returns an :doc:`error <../info_setting_types/rrerror>` in case of a failure, or :doc:`RR_Success <../info_setting_types/rrerror>` otherwise.

