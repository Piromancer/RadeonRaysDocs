RRMemoryRequirements
====================

.. _rrmemoryrequirements:

Description
+++++++++++

Size of buffers to allocate.

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
        - temporary_build_buffer_size
        - size_t
        - Size of a temporary buffer for the building process.
    *
        - temporary_update_buffer_size
        - size_t
        - Size of a temporary buffer for the update process.
		
    *
        - result_buffer_size
        - size_t
        - Size of a persistent buffer for an accelerating structure. 
		
   
