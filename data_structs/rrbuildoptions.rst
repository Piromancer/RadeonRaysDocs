RRBuildOptions
==============

.. _rrbuildoptions:

Description
+++++++++++

Various flags controlling scene and geometry build process.

Applies to
++++++++++

All supported backends

Items
+++++

.. cssclass:: full-width

.. list-table:: 
    :widths: 25 25 50
    :header-rows: 1
   
    *
        - Name
        - Type
        - Description

    *
        - build_flags
        - :doc:`RRBuildFlags <../data_types>`
        - Flags for controlling the scene and geometry build process.
    *
        - backend_specific_info
        - void
        - Used to leverage features specific to particular backends. For example, you can pass here groups of accelerating structures in Metal.

    

