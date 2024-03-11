import { validateRegex } from '../constants/constants'

validateEmptiness = (string) => {
  if (string) return ''
  return 'required'
}

validatePhoneNumber = (phoneNumber) => {
  const re = validateRegex.validatePhone
  if (re.test(phoneNumber)) return ''
  return 'invalid'
}

validateEmail = (email) => {
  const re = validateRegex.validateEmail
  if (re.test(email)) return ''
  return 'invalid'
}

const validationSchema = {
  name: [validateEmptiness],
  company: [validateEmptiness],
  phone: [validateEmptiness, validatePhoneNumber],
  email: [validateEmptiness, validateEmail],
  country: [validateEmptiness],
}

export const validateForm = (customer) => {
  let errors = {}

  for (let key in customer) {
    if (validationSchema.hasOwnProperty(key)) {
      let error = ''
      const customerProperty = customer[key]
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
