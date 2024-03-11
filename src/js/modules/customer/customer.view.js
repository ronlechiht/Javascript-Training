import {
  snackbarDelay,
  errorMessageList,
  listEmptyMessage,
  searchEmptyMessage,
} from '../../constants/constants'

import { validateForm } from '../../utils/validation'

import { createElement } from '../../utils/dom'

import { search, sort } from '../../utils/feature'

import { createDropdownBtn } from '../../utils/dropdown'

export class CustomerView {
  constructor() {
    //Get add customer button
    this.addCustomerBtn = document.querySelector('.add-customer-btn')

    //Get modal
    this.modal = document.querySelector('.add-update-modal')
    this.closeModalBtn = this.modal.querySelector('.modal-close-btn')
    this.removeModal = document.querySelector('.remove-modal')
    this.closeRemoveModalBtn = this.removeModal.querySelector(
      '.remove-modal-close-btn'
    )

    //Get modal title
    this.addTitle = this.modal.querySelector('.add-title')
    this.updateTitle = this.modal.querySelector('.update-title')
    this.removeTitle = this.removeModal.querySelector('.modal-title')

    //Get submit form
    this.form = this.modal.querySelector('.submit-form')

    //Get input field
    this.inputFields = this.form.querySelectorAll('.input-field')
    this.status = this.form.querySelector('input[name="status"]')

    //Get button
    this.submitBtn = this.form.querySelector('.submit-btn')
    this.submitUpdateBtn = this.form.querySelector('.submit-update-btn')
    this.cancelBtn = this.form.querySelector('.cancel-btn')
    this.acceptRemoveBtn = this.removeModal.querySelector('.accept-remove-btn')
    this.denyRemoveBtn = this.removeModal.querySelector('.deny-remove-btn')

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

  displayModal = () => {
    this.modal.classList.add('visibility-visible')
    this.addTitle.classList.add('visibility-visible')
    this.submitBtn.classList.add('visibility-visible')
  }

  displayEditModal = (customer) => {
    this.modal.classList.add('visibility-visible')
    this.updateTitle.classList.add('visibility-visible')
    this.submitUpdateBtn.classList.add('visibility-visible')
    this.submitUpdateBtn.id = customer.id
    for (let inputField of this.inputFields) {
      let key = inputField.name
      inputField.value = customer[key]
    }
    this.status.checked = customer.status === 'on'
  }

  displayRemoveModal = (id) => {
    this.removeModal.classList.add('visibility-visible')
    this.removeTitle.classList.add('visibility-visible')
    this.acceptRemoveBtn.id = id
  }

  hideModal = () => {
    this.modal.classList.remove('visibility-visible')
    this.addTitle.classList.remove('visibility-visible')
    this.updateTitle.classList.remove('visibility-visible')
    this.submitBtn.classList.remove('visibility-visible')
    this.submitUpdateBtn.classList.remove('visibility-visible')
    this.errorMessageHide()
    this.resetInput()
  }

  hideRemoveModal = () => {
    this.removeModal.classList.remove('visibility-visible')
    this.removeTitle.classList.remove('visibility-visible')
  }

  errorMessageHide = () => {
    this.inputFields.forEach((inputField) => {
      inputField.classList.remove('error-field')
      inputField.nextElementSibling.innerHTML = ''
    })
  }

  resetInput = () => {
    this.inputFields.forEach((inputField) => {
      inputField.value = ''
    })

    this.status.checked = false
  }

  displaySnackbar = (snackbar) => {
    document.querySelector(snackbar).classList.add('visibility-visible')
    setTimeout(
      () =>
        document.querySelector(snackbar).classList.remove('visibility-visible'),
      snackbarDelay
    )
  }

  displayFormErrors = (errors) => {
    for (let key in errors) {
      let customerProperty = key
      let errorType = errors[key]
      let inputField = this.form.querySelector('.' + key)
      inputField.classList.add('error-field')
      let errorMessage = inputField.nextElementSibling
      errorMessage.innerHTML = errorMessageList[customerProperty][errorType]
    }
  }

  displayEmptyNotification = (message) => {
    let emptyMessage = createElement('p', 'empty-message')
    emptyMessage.innerHTML = message
    this.customersTable.appendChild(emptyMessage)
    this.previousBtn.classList.add('visibility-hidden')
    this.nextBtn.classList.add('visibility-hidden')
  }

  renderGeneralInformation = (customers) => {
    const activeCustomers = customers.filter(
      (customer) => customer.status === 'on'
    )

    this.customersQuantity.innerHTML = customers.length
    this.activeQuantity.innerHTML = activeCustomers.length
  }

  renderCustomersTable = (customers, pagination) => {
    while (this.customersTable.firstChild) {
      this.customersTable.removeChild(this.customersTable.firstChild)
    }

    if (!customers.length) {
      this.displayEmptyNotification(listEmptyMessage)
      return
    }

    let _customers = JSON.parse(JSON.stringify(customers))
    const searchValue = this.searchInput.value.toLowerCase()
    if (searchValue) _customers = search(customers, searchValue)
    if (!_customers.length) {
      this.displayEmptyNotification(searchEmptyMessage)
      return
    }

    let __customers = JSON.parse(JSON.stringify(_customers))
    const sortType = this.sortOption.value
    if (sortType !== 'none') __customers = sort(_customers, sortType)

    let count = __customers.length - pagination * 8 - 1
    if (count < 0 && pagination > 0) {
      pagination -= 1
      count = __customers.length - pagination * 8 - 1
    }

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

      let dropdownMenuContainer = createElement(
        'div',
        'dropdown-menu-container'
      )

      let dropdownBtn = createDropdownBtn()
      dropdownBtn.id = customer.id
      dropdownMenuContainer.appendChild(dropdownBtn)

      let dropdownMenu = createElement('ul', 'dropdown-menu')
      let editOption = createElement('li', 'edit-customer')
      editOption.innerHTML = 'Edit'
      editOption.onclick = (e) => {
        e.target.parentNode.classList.remove('visibility-visible')
        this.displayEditModal(customer)
      }
      let removeOption = createElement('li', 'remove-customer')
      removeOption.innerHTML = 'Remove'
      removeOption.onclick = (e) => {
        e.target.parentNode.classList.remove('visibility-visible')
        this.displayRemoveModal(customer.id)
      }
      dropdownMenu.append(editOption, removeOption)
      dropdownMenuContainer.appendChild(dropdownMenu)

      customerRow.appendChild(dropdownMenuContainer)

      this.customersTable.appendChild(customerRow)
      let customerDivider = createElement('div', 'customer-divider')
      this.customersTable.appendChild(customerDivider)
    }

    if (!pagination) this.previousBtn.classList.add('visibility-hidden')
    else this.previousBtn.classList.remove('visibility-hidden')

    if (count < 8) this.nextBtn.classList.add('visibility-hidden')
    else this.nextBtn.classList.remove('visibility-hidden')
  }

  bindOpenModal = () => {
    this.addCustomerBtn.onclick = () => {
      this.displayModal()
    }
  }

  bindCloseModal = () => {
    this.closeModalBtn.onclick = () => {
      this.hideModal()
    }

    this.cancelBtn.onclick = () => {
      this.hideModal()
    }

    this.closeRemoveModalBtn.onclick = () => {
      this.hideRemoveModal()
    }

    this.denyRemoveBtn.onclick = () => {
      this.hideRemoveModal()
    }
  }

  getFormData = () => {
    const formData = new FormData(this.form)
    const customer = [...formData.keys()].reduce((acc, key) => {
      acc[key] = formData.get(key)
      return acc
    }, {})
    if (!customer.status) customer.status = '~off'

    this.errorMessageHide()
    const errors = validateForm(customer)

    if (Object.keys(errors).length) {
      this.displayFormErrors(errors)
      return
    }
    return customer
  }

  bindFirstLoad = (handler) => {
    try {
      handler()
    } catch (error) {
      this.displaySnackbar('.get-failed')
    }
  }

  bindAddCustomer(handler) {
    this.submitBtn.onclick = (event) => {
      event.preventDefault()
      const customer = this.getFormData()
      if (!customer) return

      try {
        handler(customer)
        this.displaySnackbar('.add-successful')
        this.resetInput()
      } catch (error) {
        this.displaySnackbar('.add-update-failed')
      }
    }
  }

  bindEditCustomer = (handler) => {
    this.submitUpdateBtn.onclick = (event) => {
      event.preventDefault()
      const id = this.submitUpdateBtn.id
      const customer = this.getFormData()
      if (!customer) return

      try {
        handler(customer, id)
        this.displaySnackbar('.update-successful')
      } catch (error) {
        this.displaySnackbar('.add-update-failed')
      }
    }
  }

  bindDeleteCustomer = (handler) => {
    this.acceptRemoveBtn.onclick = () => {
      const id = this.acceptRemoveBtn.id
      try {
        handler(id)
        this.hideRemoveModal()
        this.displaySnackbar('.remove-successful')
      } catch (error) {
        this.displaySnackbar('.remove-failed')
      }
    }
  }

  bindSearchOnChanged = (handler) => {
    this.searchInput.onkeyup = () => {
      this.pagination = 0
      handler(this.pagination)
    }
  }

  bindSortOnChanged = (handler) => {
    this.sortOption.onchange = () => {
      this.pagination = 0
      handler(this.pagination)
    }
  }

  bindPagination = (handler) => {
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
