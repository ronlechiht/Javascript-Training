import { VALIDATE_REGEX } from '../constants/constants'

const validateEmptiness = (string) => {
  if (string) return null
  return 'required'
}

const validatePhoneNumber = (phoneNumber) => {
  const re = VALIDATE_REGEX.phone
  if (re.test(phoneNumber)) return null
  return 'invalid'
}

const validateEmail = (email) => {
  const re = VALIDATE_REGEX.email
  if (re.test(email)) return null
  return 'invalid'
}

const validationSchema = {
  name: [validateEmptiness],
  company: [validateEmptiness],
  phone: [validateEmptiness, validatePhoneNumber],
  email: [validateEmptiness, validateEmail],
  country: [validateEmptiness],
}

export const validateForm = (data) => {
  let errors = {}

  for (let key in data) {
    if (validationSchema.hasOwnProperty(key)) {
      let error = null
      const customerProperty = data[key]
      const validators = validationSchema[key]
      for (let validator of validators) {
        error = validator(customerProperty)
        if (error) break
      }
      if (error) errors[key] = error
    }
  }

  return errors
}

export const validateField = (field, input) => {
  let error = null
  if (validationSchema.hasOwnProperty(field)) {
    const customerProperty = input
    const validators = validationSchema[field]
    for (let validator of validators) {
      error = validator(customerProperty)
      if (error) break
    }
  }

  return error
}
