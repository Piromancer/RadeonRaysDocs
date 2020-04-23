RadeonRays 4.0
==============

RadeonRays is a ray intersection acceleration library for heterogeneous systems. AMD developed RadeonRays to help developers make the most of GPU, APUs and CPUs, and to eliminate the need to maintain hardware-dependent code.
 
The library exposes a well-defined C API for scene building and performing asynchronous ray intersection queries. 

RadeonRays is not limited to AMD hardware or a specific operating system. The library helps assure compatibility and best performance across a wide range of hardware platforms.

Backends
++++++++

The library supports the following graphics and GPGPU frameworks as its backends:

* DirectX 12
* Metal
* Vulkan

System Requirements
+++++++++++++++++++

RadeonRays is not limited to AMD hardware, a specific operating system or graphics frameworks. It requires a PC with the following software and hardware:

* DirectX12: a 64-bit version of Windows® 10, and a GPU and drivers that supports DirectX12 features
* Metal: a 64-bit version of MacOS® X 10.15 or later, and a discrete GPU that supports the MPS acceleration structure
* Vulkan: a 64-bit version of Windows® 10 or Linux, and a GPU and drivers that support Vulkan version 1.2


Package Contents
++++++++++++++++

The distributed RadeonRays package contains:

* RadeonRays SDK and libraries 
* Tests
* Demos

In This Document
++++++++++++++++

* :doc:`Examples <examples>`
* :doc:`Data Types <data_types>`
* :doc:`Data Structs <data_structs>`
* :doc:`Info and Setting Types <info_setting_types>`
* :doc:`API Reference <api>`

.. toctree::
   :maxdepth: 1
   :titlesonly:
   :hidden:
   
   Examples <examples>
   Data Types <data_types>
   Data Structs <data_structs>
   Info and Setting Types <info_setting_types>
   API Reference <api>
 

