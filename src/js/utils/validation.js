import { validateRegex } from '../constants/constants'

function validateEmptiness(string) {
  if (string !== '') return ''
  return 'required'
}

function validatePhoneNumber(phoneNumber) {
  const re = validateRegex.validatePhone
  if (re.test(phoneNumber)) return ''
  return 'invalid'
}

function validateEmail(email) {
  const re = validateRegex.validateEmail
  if (re.test(email)) return ''
  return 'invalid'
}

validationSchema = {
  name: [validateEmptiness],
  company: [validateEmptiness],
  phone: [validateEmptiness, validatePhoneNumber],
  email: [validateEmptiness, validateEmail],
  country: [validateEmptiness],
}

export function validateForm(customer) {
  let errors = {}

  for (let key in customer) {
    if (this.validationSchema.hasOwnProperty(key)) {
      let error = ''
      const customerProperty = customer[key]
      const validators = this.validationSchema[key]
      for (let validator of validators) {
        error = validator(customerProperty)
        if (error !== '') break
      }
      if (error !== '') errors[key] = error
    }
  }

  return errors
}