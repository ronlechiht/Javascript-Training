import { snackbarDelay, errorMessageList } from '../../constants/constants'

import { validateForm } from '../../utils/validation'

import { createElement } from '../../utils/dom'

import { search, sort } from '../../utils/feature'

import { createDropdownBtn, createDropdownMenu } from '../../utils/dropdown'

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

    //Get general information
    this.customersQuantity = document.querySelector('.customers-quantity')
    this.activeQuantity = document.querySelector('.active-quantity')

    //Get search input
    this.searchInput = document.querySelector('.search-input')

    //Get sort type
    this.sortOption = document.querySelector('.sort-option-list')

    //Get customers table
    this.customersTable = document.querySelector('.table-body')

    //Get pagination
    this.previousBtn = document.querySelector('.previous-btn')
    this.nextBtn = document.querySelector('.next-btn')
    this.pagination = 0
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

  renderCustomersTable(customers, pagination) {
    while (this.customersTable.firstChild) {
      this.customersTable.removeChild(this.customersTable.firstChild)
    }

    const activeCustomers = customers.filter(
      (customer) => customer.status === 'on'
    )

    const searchValue = this.searchInput.value.toLowerCase()
    const _customers = search(customers, searchValue)

    const sortType = this.sortOption.value
    const __customers = sort(_customers, sortType)

    let count = __customers.length - pagination * 8 - 1

    for (let i = 0; i <= Math.min(count, 7); i++) {
      let customer = __customers[pagination * 8 + i]

      let customerRow = createElement('div', 'customer')
      for (let key in customer) {
        if (key === 'id') continue
        if (key !== 'status') {
          let customerProperty = createElement('p')
          customerProperty.innerHTML = customer[key]
          customerRow.appendChild(customerProperty)
        } else {
          let customerStatus = createElement('p', 'status-tag')
          if (customer.status === 'on') {
            customerStatus.classList.add('status-active')
            customerStatus.innerHTML = 'Active'
          } else {
            customerStatus.innerHTML = 'Inactive'
          }
          customerRow.appendChild(customerStatus)
        }
      }

      let dropDownMenuContainer = createElement(
        'div',
        'dropdown-menu-container'
      )

      let dropdownBtn = createDropdownBtn()
      dropdownBtn.id = customer.id
      dropDownMenuContainer.appendChild(dropdownBtn)

      let dropDownMenu = createDropdownMenu()
      dropDownMenuContainer.appendChild(dropDownMenu)

      customerRow.appendChild(dropDownMenuContainer)

      this.customersTable.appendChild(customerRow)
      let customerDivider = createElement('div', 'customer-divider')
      this.customersTable.appendChild(customerDivider)
    }

    if (pagination === 0) this.previousBtn.classList.add('visibility-hidden')
    else this.previousBtn.classList.remove('visibility-hidden')

    if (count < 8) this.nextBtn.classList.add('visibility-hidden')
    else this.nextBtn.classList.remove('visibility-hidden')

    this.customersQuantity.innerHTML = customers.length
    this.activeQuantity.innerHTML = activeCustomers.length
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
      if (!customer.status) customer.status = '~off'

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

  bindSearchOnChanged(handler) {
    this.searchInput.onkeyup = () => {
      this.pagination = 0
      handler(this.pagination)
    }
  }

  bindSortOnChanged(handler) {
    this.sortOption.onchange = () => {
      this.pagination = 0
      handler(this.pagination)
    }
  }

  bindPagination(handler) {
    this.nextBtn.onclick = () => {
      this.pagination += 1
      handler(this.pagination)
    }

    this.previousBtn.onclick = () => {
      this.pagination -= 1
      handler(this.pagination)
    }
  }
}
