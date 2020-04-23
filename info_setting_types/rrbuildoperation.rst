RRBuildOperation
================

.. _rrbuildoperation:

Usage
+++++++

Type of geometry or scene build operation. 

:doc:`rrCmdBuildGeometry() <../api/rrcmdbuildscene>` and :doc:`rrCmdBuildScene() <../api/rrcmdbuildgeometry>` can either build or update an underlying acceleration structure.

Applies to
++++++++++

All supported backends

Possible Values
+++++++++++++++++

.. cssclass:: full-width

.. list-table::
    :widths: 40 10 50
    :header-rows: 1

    *
        - Name
        - Value
        - Brief Explanation

    *
        - RR_BUILD_OPERATION_BUILD
        - 1
        - Build operation.
    *
        - RR_BUILD_OPERATION_UPDATE
        - 2
        - Update operation.

