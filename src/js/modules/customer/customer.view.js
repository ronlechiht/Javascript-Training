import { snackbarDelay, errorMessageList } from '../../constants/constants'

import { validateForm } from '../../utils/validation'

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
    this.status = this.form.querySelector('input[name="status"]')

    //Get button
    this.submitBtn = this.form.querySelector('.submit-btn')
    this.cancelBtn = this.form.querySelector('.cancel-btn')
  }

  displayModal(modal) {
    modal.classList.add('visibility-visible')
  }

  hideModal(modal) {
    modal.classList.remove('visibility-visible')
    this.errorMessageHide()
    this.resetInput()
  }

  errorMessageHide() {
    this.inputFields.forEach((inputField) => {
      inputField.classList.remove('error-field')
      inputField.nextElementSibling.innerHTML = ''
    })
  }

  resetInput() {
    this.inputFields.forEach((inputField) => {
      inputField.value = ''
    })

    this.status.checked = false
  }

  displaySnackbar(snackbar) {
    document.querySelector(snackbar).classList.add('visibility-visible')
    setTimeout(
      () =>
        document.querySelector(snackbar).classList.remove('visibility-visible'),
      snackbarDelay
    )
  }

  displayFormErrors(errors) {
    for (let key in errors) {
      let customerProperty = key
      let errorType = errors[key]
      let inputField = this.form.querySelector('.' + key)
      inputField.classList.add('error-field')
      let errorMessage = inputField.nextElementSibling
      errorMessage.innerHTML = errorMessageList[customerProperty][errorType]
    }
  }

  bindOpenModal() {
    this.addCustomerBtn.onclick = () => {
      this.displayModal(this.modal)
    }
  }

  bindCloseModal() {
    this.closeModalBtn.onclick = () => {
      this.hideModal(this.modal)
    }

    this.cancelBtn.onclick = () => {
      this.hideModal(this.modal)
    }
  }

  bindAddCustomer(handler) {
    this.submitBtn.onclick = (event) => {
      event.preventDefault()
      const addFormData = new FormData(this.form, this.submitBtn)
      const customer = [...addFormData.keys()].reduce((acc, key) => {
        acc[key] = addFormData.get(key)
        return acc
      }, {})

      this.errorMessageHide()
      const errors = validateForm(customer)

      if (Object.keys(errors).length) {
        this.displayFormErrors(errors)
        return
      }

      try {
        handler(customer)
        this.displaySnackbar('.successful')
        this.resetInput()
      } catch (error) {
        this.displaySnackbar('.failed')
      }
    }
  }
}
