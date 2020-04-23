rrGetCommandStreamFromD3D12CommandList
======================================
	
Obtains command stream from D3D12 graphics command list.
  
.. cssclass:: api-code-block

.. list-table:: 
   :widths: 25 75

   * - :doc:`RRError <../info_setting_types/rrerror>` rrGetCommandStreamFromD3D12CommandList(
     - :doc:`RRContext <../data_types>` context,
   * - 
     - ID3D12GraphicsCommandList* command_list,
   * -
     - :doc:`RRCommandStream <../data_types>`\* command_stream);


Applies to
++++++++++

DirectX 

Parameters
++++++++++

.. cssclass:: full-width

.. list-table::
    :widths: 20 15 65
    :header-rows: 1

    *
        - Parameter
        - Input/Output
        - Description

    *
        - context
        - input
        - RR API context.

    *
        - command_list
        - input
        - 3D12 command list.
		
    *
        - command_stream
        - output
        - Command stream.



Return
++++++

Returns an :doc:`error <../info_setting_types/rrerror>` in case of a failure, or :doc:`RR_Success <../info_setting_types/rrerror>` otherwise.

