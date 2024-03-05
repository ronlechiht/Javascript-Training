export class CustomerView {
  constructor() {
    //Get add customer button
    this.addCustomerBtn = document.querySelector('.add-customer-btn')

    //Get add customer modal
    this.modal = document.querySelector('.modal')
    this.closeModalBtn = this.modal.querySelector('.modal-close-btn')

    //Get submit form
    this.form = this.modal.querySelector('.submit-form')

    //Get input field
    this.inputFields = this.form.querySelectorAll('.input-field')
    this.name = this.form.querySelector('input[name="name-input"]')
    this.company = this.form.querySelector('input[name="company-input"]')
    this.phone = this.form.querySelector('input[name="phone-input"]')
    this.email = this.form.querySelector('input[name="email-input"]')
    this.country = this.form.querySelector('select[name="country-input"]')
    this.status = this.form.querySelector('input[name="status-input"]')

    //Get alert messages
    this.alerts = this.form.querySelectorAll('.validate-alert')
    this.alertName = this.form.querySelector('.alert-name')
    this.alertCompany = this.form.querySelector('.alert-company')
    this.alertPhone1 = this.form.querySelector('.alert-phone-1')
    this.alertPhone2 = this.form.querySelector('.alert-phone-2')
    this.alertEmail1 = this.form.querySelector('.alert-email-1')
    this.alertEmail2 = this.form.querySelector('.alert-email-2')
    this.alertCountry = this.form.querySelector('.alert-country')

    //Get button
    this.submitBtn = this.form.querySelector('.submit-btn')
    this.cancelBtn = this.form.querySelector('.cancel-btn')
  }

  displayModal (modal) {
    modal.style.visibility = 'visible'
  }

  hideModal (modal) {
    modal.style.visibility = 'hidden'
    this.errorMessageHide()
    this.resetInput()
  }

  errorMessageHide () {
    this.inputFields.forEach((inputField) => {
      inputField.style.borderColor = '#eee'
    })
    this.alerts.forEach((message) => {
      message.style.visibility = 'hidden'
    })
  }

  resetInput() {
    this.name.value = ''
    this.company.value = ''
    this.phone.value = ''
    this.email.value = ''
    this.country.value = ''
    this.status.checked = false
  }

  displaySnackbar(snackbar) {
    document.querySelector(snackbar).style.visibility = 'visible'
    setTimeout(
      () => (document.querySelector(snackbar).style.visibility = 'hidden'),
      3000
    )
  }

  validateEmptiness(string) {
    if (string!=='') return ''
    else return 'required'
  }

  validatePhoneNumber(phoneNumber) {
    let re = /\(\d{3}\)\s\d{3}-\d{4}$/
    if (re.test(phoneNumber)) return ''
    else return 'invalid'
  }

  validateEmail (email) {
    let re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (re.test(email)) return ''
    else return 'invalid'
  }

  validationSchema = {
    'name': [this.validateEmptiness],
    'company': [this.validateEmptiness],
    'phone': [this.validateEmptiness, this.validatePhoneNumber],
    'email': [this.validateEmptiness, this.validateEmail],
    'country': [this.validateEmptiness]
  }

  validateForm(customer) {
    let errors = {}

    for (let key in customer) {
      if(this.validationSchema.hasOwnProperty(key)) {
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

  displayFormErrors(errors) {
    for (let key in errors) {
      let inputField = this.form.querySelector('.'+key)
      inputField.style.borderColor = '#ff0000'
      let errorMessage = this.form.querySelector('.'+key+'-'+errors[key])
      errorMessage.style.visibility = 'visible'
    }
  }

  bindOpenModal () {
    this.addCustomerBtn.onclick = () => {
      this.displayModal(this.modal)
    }
  }

  bindCloseModal () {
    this.closeModalBtn.onclick = () => {
      this.hideModal(this.modal)
    }

    this.cancelBtn.onclick = () => {
      this.hideModal(this.modal)
    }
  }

  bindAddCustomer(handler) {
    this.submitBtn.onclick = (event) => {
      event.preventDefault();
      const addFormData = new FormData(this.form, this.submitBtn)
      const customer = {
        name: addFormData.get('name-input'),
        company: addFormData.get('company-input'),
        phone: addFormData.get('phone-input'),
        email: addFormData.get('email-input'),
        country: addFormData.get('country-input'),
        status: addFormData.get('status-input'),
      }
      this.errorMessageHide();
      handler(customer)
    }
  }
}
