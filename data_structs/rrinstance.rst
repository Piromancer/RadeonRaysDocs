RRInstance
==========

.. _rrinstance:

Description
+++++++++++

A geometry instance provided as a buffer, with a transformation matrix specific for this instance.

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
        - geometry
        - :doc:`RRDevicePtr <../info_setting_types/rrprimitivetype>`
        - DevicePtr containing an acceleration structure.
    *
        - transform[3][4]
        - float
        - Transformation matrix used to represent geometry.
		
   
