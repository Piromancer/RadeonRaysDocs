rrCmdBuildScene
===============

Builds or updates a scene.

Given a number of geometry buffers with instances description from the client, this function builds top level acceleration structure topology (in case of a build) or updates acceleration structure keeping topology intact (update) in frames of an allocated scene buffer.
  
.. cssclass:: api-code-block

.. list-table:: 
   :widths: 25 75

   * - :doc:`RRError <../info_setting_types/rrerror>` rrCmdBuildScene(
     - :doc:`RRContext <../data_types>` context,
   * - 
     - const :doc:`RRGeometryBuildInput <../data_structs/rrgeometrybuildinput>`\* build_input,
   * -
     - const :doc:`RRBuildOptions <../data_structs/rrbuildoptions>`\* build_options,
   * -
     - :doc:`RRDevicePtr <../data_types>` temporary_buffer,
   * -
     - :doc:`RRDevicePtr <../data_types>` scene_buffer,
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
        - build_input
        - input
        - Decribes input geometires to build scene for.

    *
        - build_options
        - input
        - Various flags controlling build process.
		
    *
        - temporary_buffer
        - input
        - Temporary buffer for build operation.
		
    *
        - scene_buffer
        - output
        - Buffer to write scene to.
		
    *
        - command_stream
        - input
        - Command stream to write command.



Return
++++++

Returns an :doc:`error <../info_setting_types/rrerror>` in case of a failure, or :doc:`RR_Success <../info_setting_types/rrerror>` otherwise.

