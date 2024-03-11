export const snackbarDelay = 3000;

export const customerApi = process.env.API_URL;

export const validateRegex = {
  validatePhone: /\(\d{3}\)\s\d{3}-\d{4}$/,
  validateEmail: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
};

export const errorMessageList = {
  name: {
    required: "The customer name field is required",
  },
  company: {
    required: "The company name field is required",
  },
  phone: {
    required: "The phone number field is required",
    invalid:
      "The phone number invalid. Enter phone number in this format: (123) 456-7890",
  },
  email: {
    required: "The email field is required",
    invalid: "The email invalid. Enter email in this format: example@abc.xyz",
  },
  country: {
    required: "The country field is required",
  },
};

export const listEmptyMessage = "There are no customers in the list";
export const searchEmptyMessage =
  "There are no customers you are looking for in the list";

export const debounceDelay = 1000;
