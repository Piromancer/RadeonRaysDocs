RRSceneBuildInput
=================

.. _rrscenebuildinput:

Description
+++++++++++

Scene consists of a set of instances. Each of the instances is defined by:

* Root pointer of the corresponding geometry
* Transformation matrix
* Mask

Instances can refer to the same geometry, but with different transformation matrices (essentially implementing instancing). Mask is used to implement ray masking: ray mask is bitwise &ded with an instance mask and no intersections are evaluated with the primitive of corresponding instance if the result is 0.

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
        - :doc:`RRInstance <rrinstance>`\* instances;
        - const
        - aRRay of ``instance_count`` pointers to instance objects.
    *
        - instance_count
        - uint32_t
        - Number of instances.
		
   
