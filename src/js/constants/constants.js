export const SNACKBAR_DELAY = 2 * 1000

export const LIST_EMPTY_MSG = 'There are no customers in the list'

export const DEBOUNCE_DELAY = 1000

export const PAGE_SIZE = 8

export const VALIDATE_REGEX = {
  phone: /\(\d{3}\)\s\d{3}-\d{4}$/,
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
}

export const LIST_ERROR_MSG = {
  name: {
    required: 'The customer name field is required',
  },
  company: {
    required: 'The company name field is required',
  },
  phone: {
    required: 'The phone number field is required',
    invalid:
      'The phone number invalid. Enter phone number in this format: (123) 456-7890',
  },
  email: {
    required: 'The email field is required',
    invalid: 'The email invalid. Enter email in this format: example@abc.xyz',
  },
  country: {
    required: 'The country field is required',
  },
}

export const LIST_CUSTOMER_FIELD = {
  id: 'id',
  name: 'name',
  company: 'company',
  phone: 'phone',
  email: 'email',
  country: 'country',
  status: 'status',
}

export const CUSTOMER_STATUS = {
  on: 'on',
  off: '~off',
}

export const STATUS_HTML = {
  on: 'Active',
  off: 'Inactive',
}

export const SNACKBAR_MSG = {
  successAdd: 'Customer has been successfully added',
  successEdit: 'Customer has been successfully updated',
  successDelete: 'Customer has been successfully removed',
  failed: 'Something went wrong',
}

export const SNACKBAR_STATUS = {
  success: 'success',
  failed: 'failed',
}

export const QUERY_PARAM_KEYS = {
  page: '_page',
  limit: '_limit',
  search: 'name_like',
  sort: '_sort',
}
