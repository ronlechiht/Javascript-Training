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

  validatePhoneNumber(phoneNumber) {
    var re = /\(\d{3}\)\s\d{3}-\d{4}/
    return re.test(phoneNumber)
  }

  validateEmail (email) {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return re.test(email)
  }

  errorMessageDisplay (inputField, message) {
    inputField.style.borderColor = '#ff0000'
    message.style.visibility = 'visible'
  }

  errorMessageHide () {
    this.inputFields.forEach((inputField) => {
      inputField.style.borderColor = '#eee'
    })
    this.alerts.forEach((message) => {
      message.style.visibility = 'hidden'
    })
  }

  validateForm(customer) {
    let isValidate = true

    if (customer.name === '') {
      this.errorMessageDisplay(this.name, this.alertName)
      isValidate = false
    }

    if (customer.company === '') {
      this.errorMessageDisplay(this.company, this.alertCompany)
      isValidate = false
    }

    if (customer.phone === '') {
      this.errorMessageDisplay(this.phone, this.alertPhone1)
      isValidate = false
    } else if (!this.validatePhoneNumber(customer.phone)) {
      this.errorMessageDisplay(this.phone, this.alertPhone2)
      isValidate = false
    }

    if (customer.email === '') {
      this.errorMessageDisplay(this.email, this.alertEmail1)
      isValidate = false
    } else if (!this.validateEmail(customer.email)) {
      this.errorMessageDisplay(this.email, this.alertEmail2)
      isValidate = false
    }

    if (customer.country === '') {
      this.errorMessageDisplay(this.country, this.alertCountry)
      isValidate = false
    }

    return isValidate
  }

  displaySnackbar(snackbar) {
    document.querySelector(snackbar).style.visibility = 'visible'
    setTimeout(
      () => (document.querySelector(snackbar).style.visibility = 'hidden'),
      3000
    )
  }

  resetInput() {
    this.name.value = ''
    this.company.value = ''
    this.phone.value = ''
    this.email.value = ''
    this.country.value = ''
    this.status.checked = false
  }

  bindOpenCloseModal () {
    this.addCustomerBtn.onclick = () => {
      this.modal.style.visibility = 'visible'
    }

    this.closeModalBtn.onclick = () => {
      this.modal.style.visibility = 'hidden'
    }

    this.cancelBtn.onclick = () => {
      this.modal.style.visibility = 'hidden'
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
