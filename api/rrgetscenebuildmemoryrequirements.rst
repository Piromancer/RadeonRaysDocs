rrGetSceneBuildMemoryRequirements
=================================

Gets memory requirements for scene build.
  
.. cssclass:: api-code-block

.. list-table:: 
   :widths: 25 75

   * - :doc:`RRError <../info_setting_types/rrerror>` rrGetSceneBuildMemoryRequirements(
     - :doc:`RRContext <../data_types>` context,
   * - 
     - const :doc:`RRSceneBuildInput <../data_structs/rrscenebuildinput>`\* build_input,
   * -
     - const :doc:`RRBuildOptions <../data_structs/rrbuildoptions>`\* build_options,
   * -
     - :doc:`RRMemoryRequirements <../data_structs/rrmemoryrequirements>`\* memory_requirements);
	 
Applies to
++++++++++

All supported backends except Metal

	 

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
        - memory_requirements
        - output
        - Pointer to write result to.


Return
++++++

Returns an :doc:`error <../info_setting_types/rrerror>` in case of a failure, or :doc:`RR_Success <../info_setting_types/rrerror>` otherwise.

