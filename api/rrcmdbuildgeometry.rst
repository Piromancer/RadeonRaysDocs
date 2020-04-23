rrCmdBuildGeometry
==================

Builds or updates a geometry.

Given geometry description from the client, this function builds acceleration structure topology (in case of a build) or updates acceleration structure keeping topology intact (update) in frames of an allocated geometry buffer.
  
.. cssclass:: api-code-block

.. list-table:: 
   :widths: 25 75

   * - :doc:`RRError <../info_setting_types/rrerror>` rrCmdBuildGeometry(
     - :doc:`RRContext <../data_types>` context,
   * - 
     - :doc:`RRBuildOperation <../info_setting_types/rrbuildoperation>` build_operation,
   * -
     - const :doc:`RRGeometryBuildInput <../data_structs/rrgeometrybuildinput>`\* build_input,
   * -
     - const :doc:`RRBuildOptions <../data_structs/rrbuildoptions>`\* build_options,
   * -
     - :doc:`RRDevicePtr <../data_types>` temporary_buffer,
   * -
     - :doc:`RRDevicePtr <../data_types>` geometry_buffer,
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
        - build_operation
        - input
        - Type of build operation.
		
    *
        - build_input
        - input
        - Describes input primitive to build geometry from.

    *
        - build_options
        - input
        - Various flags controlling build process.
		
    *
        - temporary_buffer
        - input
        - Temporary buffer for build operation.
		
    *
        - geometry_buffer
        - output
        - Buffer to put geometry to.
		
    *
        - command_stream
        - input
        - Command stream to write command into.



Return
++++++

Returns an :doc:`error <../info_setting_types/rrerror>` in case of a failure, or :doc:`RR_Success <../info_setting_types/rrerror>` otherwise.

