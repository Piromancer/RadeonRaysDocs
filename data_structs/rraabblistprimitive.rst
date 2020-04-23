RRAABBListPrimitive
===================

.. _rraabblistprimitive:

Description
+++++++++++

AABB list primitive.

AABB list is an aRRay of axis aligned bounding boxes, represented by device memory pointer and stride between two consequetive boxes. Each AABB is a pair of float4 values (xmin, ymin, zmin, unused), (xmax, ymax, zmax, unused).


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
        - aabbs
        - :doc:`RRDevicePtr <../data_types>`
        - Device pointer to AABB data.
    *
        - aabb_count
        - uint32_t
        - Number of AABBs in the aRRay.
		
    *
        - aabb_stride
        - uint32_t
        - Stride in bytes between two AABBs.
    

