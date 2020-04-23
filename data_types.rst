RR Data Types
=============

RadeonRays supports the following basic data types.

.. _rrbuildflags:

.. _rrcommandstream:

.. _rrcontext:

.. _rrdeviceptr:

.. _rrevent:

.. _rrraymask:

.. cssclass:: full-width

.. list-table::
    :widths: 30 70
    :header-rows: 1
	
    *
        - Data Type

        - Description

    *
        - RRBuildFlags

        - Flags for controlling the scene and geometry build process.

    *
        - RRCommandStream

        - Wrapper for equivalent objects in backend frameworks containing commands to be executed.

    *
        - RRContext

        - RR context.
		
    *
        - RRDevicePtr

        - Wrapper for equivalent objects in backend frameworks providing buffers for storing data.

    *
        - RREvent

        - Synchronizing primitive used as a wrapper for equivalent objects in backend frameworks.
		
    *
        - RRRayMask

        - Mask used to exclude certain geometry from the raytracing process.

