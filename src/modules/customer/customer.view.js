export class CustomerView {
  constructor() {
    //Get inputs field
    this.inputFields = document.querySelectorAll('.input-field')
    this.name = document.querySelector('input[name="name-input"]')
    this.company = document.querySelector('input[name="company-input"]')
    this.phone = document.querySelector('input[name="phone-input"]')
    this.email = document.querySelector('input[name="email-input"]')
    this.country = document.querySelector('select[name="country-input"]')
    this.status = document.querySelector('input[name="status-input"]')

    //Get alert messages
    this.alerts = document.querySelectorAll('.validate-alert')
    this.alertName = document.querySelector('.alert-name')
    this.alertCompany = document.querySelector('.alert-company')
    this.alertPhone1 = document.querySelector('.alert-phone-1')
    this.alertPhone2 = document.querySelector('.alert-phone-2')
    this.alertEmail1 = document.querySelector('.alert-email-1')
    this.alertEmail2 = document.querySelector('.alert-email-2')
    this.alertCountry = document.querySelector('.alert-country')

    //Get add customer modal
    this.modal = document.querySelector('.modal')

    //Get button
    this.addCustomerBtn = document.querySelector('.add-customer-btn')
    this.closeModalBtn = document.querySelector('.modal-close-btn')
    this.submitBtn = document.querySelector('.submit-btn')
    this.cancelBtn = document.querySelector('.cancel-btn')
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
    this.submitBtn.onclick = () => {
      const customer = {
        name: this.name.value,
        company: this.company.value,
        phone: this.phone.value,
        email: this.email.value,
        country: this.country.value,
        status: this.status.checked,
      }
      this.errorMessageHide();
      handler(customer)
    }
  }
}
