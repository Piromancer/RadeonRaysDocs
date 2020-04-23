RRError
=======

.. _rrerror:

Usage
+++++++

Status or error code.

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
        - RR_SUCCESS
        - 0
        - Successful operation.
    *
        - RR_ERROR_NOT_IMPLEMENTED
        - 1
        - Not implemented.

    *
        - RR_ERROR_INTERNAL
        - 2
        - Internal error.
		
    *
        - RR_ERROR_OUT_OF_HOST_MEMORY
        - 3
        - Not enough memory on host.

    *
        - RR_ERROR_OUT_OF_DEVICE_MEMORY
        - 4
        - Not enough memory on executing device (GPU).

    *
        - RR_ERROR_INVALID_API_VERSION
        - 5
        - Invalid RR library version.

    *
        - RR_ERROR_INVALID_PARAMETER
        - 6
        - Invalid parameter name.

    *
        - RR_ERROR_UNSUPPORTED_API
        - 7
        - Not supported by the current backend version.
		
    *
        - RR_ERROR_UNSUPPORTED_INTEROP
        - 8
        - Interoperability between backends is not supported.
		