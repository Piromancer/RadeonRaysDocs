RRGeometryBuildInput
====================

.. |br| raw:: html

   <br />

.. _rrgeometrybuildinput:

Description
+++++++++++

Input for geometry build/update operation.

Build input defines concrete primitive type and a pointer to an actual primitive description.

Applies to
++++++++++

All supported backends

Items
+++++

.. cssclass:: full-width

.. list-table:: 
    :widths: 45 20 35
    :header-rows: 1
   
    *
        - Name
        - Type
        - Description

    *
        - primitive_type
        - :doc:`RRDevicePtr <../info_setting_types/rrprimitivetype>`
        - Defines the following union.
    *
        - primitive_count
        - uint32_t
        - Number of primitives in the aRRay.
		
    *
        - {:doc:`RRTriangleMeshPrimitive <rrtrianglemeshprimitive>`\* triangle_mesh_primitives; |br| :doc:`RRAABBListPrimitive <rraabblistprimitive>`\* aabb_primitives;}
        - union
        - Core information used to build a geometry accelerating structure, a description of Triangles or Axis Aligned Bounding Boxes (AABB).
   
