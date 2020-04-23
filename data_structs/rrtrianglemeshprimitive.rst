RRTriangleMeshPrimitive
=======================

.. _rrtrianglemeshprimitive:

Description
+++++++++++

Triangle mesh primitive.

Triangle mesh primitive is represented as an indexed vertex aRRay. Vertex and index aRRays are defined using device pointers and strides. Each vertex has to have 3 components: (x, y, z) coordinates. Indices are organized into triples (i0, i1, i2) - one for each triangle.

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
        - vertices
        - :doc:`RRDevicePtr <../data_types>`
        - Device pointer to vertex data.
    *
        - vertex_count
        - uint32_t
        - Number of vertices in vertex aRRay.
		
    *
        - vertex_stride
        - uint32_t
        - Stride in bytes between two vertices.
		
    *
        - triangle_indices
        - :doc:`RRDevicePtr <../data_types>`
        - Device pointer to index data.
		
    *
        - triangle_count
        - uint32_t
        - Number of trinagles in index aRRay.
    

