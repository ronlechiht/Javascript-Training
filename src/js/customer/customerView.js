import {
  SNACKBAR_DELAY,
  LIST_CUSTOMER_FIELD,
  LIST_ERROR_MSG,
  LIST_EMPTY_MSG,
  PAGE_SIZE,
  CUSTOMER_STATUS,
  STATUS_HTML,
  SNACKBAR_STATUS,
  SNACKBAR_MSG,
  QUERY_PARAM_KEYS,
} from '../constants/constants'

import { validateForm, validateField } from '../utils/validation'

import { createElement } from '../utils/dom'

import { formatPhoneNumber } from '../utils/formatPhoneNumber'

export class CustomerView {
  constructor() {
    //Get add customer button
    this.addCustomerBtn = document.querySelector('.add-customer-btn')

    //Get modal
    this.modal = document.querySelector('.modal-add-update')
    this.closeModalBtn = this.modal.querySelector('.modal-close-btn')
    this.removeModal = document.querySelector('.modal-remove')
    this.closeRemoveModalBtn = this.removeModal.querySelector(
      '.remove-modal-close-btn',
    )

    //Get modal title
    this.modalTitle = this.modal.querySelector('.modal-title')

    //Get submit form
    this.form = this.modal.querySelector('.submit-form')

    //Get input field
    this.inputFields = this.form.querySelectorAll('.input-field')
    this.phoneInput = this.form.querySelector('input[name="phone"]')
    this.status = this.form.querySelector('input[name="status"]')

    //Get button
    this.submitBtn = this.form.querySelector('.btn-submit')
    this.cancelBtn = this.form.querySelector('.btn-cancel')
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

    this.showingDataText = document.querySelector('.showing-data')

    //Get pagination
    this.previousBtn = document.querySelector('.previous-btn')
    this.nextBtn = document.querySelector('.next-btn')

    //Get snackbar
    this.snackbar = document.querySelector('.snackbar')
    this.statusIcon = this.snackbar.querySelector('.status-icon')
    this.snackbarMsg = this.snackbar.querySelector('.snackbar-msg')

    //Get loading animation
    this.loading = document.querySelector('.loading-popup')

    //Init params
    this.params = {
      sortBy: LIST_CUSTOMER_FIELD.id,
      order: 'desc',
      page: 1,
      limit: PAGE_SIZE,
    }

    //Customer ID for edit, delete feature
    this.customerID = null

    this.bindOpenModal()
    this.bindCloseModal()
    this.formatToPhone()
    this.validateFormData()
  }

  formatToPhone = () => {
    this.phoneInput.addEventListener('keyup', () =>
      formatPhoneNumber(this.phoneInput),
    )
  }

  disablePagination = () => {
    this.previousBtn.disabled = true
    this.nextBtn.disabled = true
  }

  enablePagination = () => {
    this.previousBtn.disabled = false
    this.nextBtn.disabled = false
  }

  displayAddModal = () => {
    this.modal.classList.add('visibility-visible')
    this.modalTitle.innerHTML = 'Add Customer'
  }

  displayEditModal = (customer) => {
    this.modal.classList.add('visibility-visible')
    this.modalTitle.innerHTML = 'Update Customer'
    this.customerID = customer.id
    for (let inputField of this.inputFields) {
      let key = inputField.name
      inputField.value = customer[key]
    }
    this.status.checked = customer.status === 'on'
  }

  displayRemoveModal = (id) => {
    this.removeModal.classList.add('visibility-visible')
    this.customerID = id
  }

  hideModal = () => {
    this.modal.classList.remove('visibility-visible')
    this.hideFormErrors()
    this.resetInput()
  }

  hideRemoveModal = () => {
    this.removeModal.classList.remove('visibility-visible')
  }

  displayFieldError = (inputField, error) => {
    inputField.classList.add('error-field')
    let errorMessage = inputField.nextElementSibling
    errorMessage.innerHTML = LIST_ERROR_MSG[inputField.name][error]
  }

  displayFormErrors = (errors) => {
    for (let key in errors) {
      let inputField = this.form.querySelector('.' + key)
      this.displayFieldError(inputField, errors[key])
    }
  }

  hideFieldError = (inputField) => {
    inputField.classList.remove('error-field')
    inputField.nextElementSibling.innerHTML = ''
  }

  hideFormErrors = () => {
    this.inputFields.forEach((inputField) => {
      this.hideFieldError(inputField)
    })
  }

  resetInput = () => {
    this.inputFields.forEach((inputField) => {
      inputField.value = ''
    })

    this.status.checked = false
  }

  displaySnackbar = (status, message) => {
    this.snackbar.classList.add(status)
    this.snackbarMsg.innerHTML = message
    setTimeout(() => {
      this.snackbarMsg.innerHTML = ''
      this.snackbar.classList.remove(status)
    }, SNACKBAR_DELAY)
  }

  displayEmptyNotification = (message) => {
    let emptyMessage = createElement('p', 'empty-message')
    emptyMessage.innerHTML = message
    this.customersTable.appendChild(emptyMessage)
  }

  displayLoading = () => {
    this.loading.classList.add('visibility-visible')
  }

  hideLoading = () => {
    this.loading.classList.remove('visibility-visible')
  }

  renderDropdownBtn = () => {
    let dropdownBtn = createElement('div', 'dropdown-btn')
    let dot1 = createElement('div', 'dot')
    let dot2 = createElement('div', 'dot')
    let dot3 = createElement('div', 'dot')
    dropdownBtn.append(dot1, dot2, dot3)
    dropdownBtn.addEventListener('click', (e) => {
      let clickedDropdownBtn = e.target.closest('.dropdown-btn')
      if (!clickedDropdownBtn.nextElementSibling.classList[1]) {
        //Hide another dropdown menu if exist
        let existDropdownMenu = document.querySelector(
          '.dropdown-menu.visibility-visible',
        )
        if (existDropdownMenu)
          existDropdownMenu.classList.remove('visibility-visible')
        //Display clicked dropdown menu
        clickedDropdownBtn.nextElementSibling.classList.add(
          'visibility-visible',
        )
      } else {
        clickedDropdownBtn.nextElementSibling.classList.remove(
          'visibility-visible',
        )
      }
    })
    return dropdownBtn
  }

  renderDropdownMenu = (customer) => {
    let dropdownMenu = createElement('ul', 'dropdown-menu')
    let editOption = createElement('li', 'edit-customer')
    editOption.innerHTML = 'Edit'
    editOption.addEventListener('click', (e) => {
      e.target.parentNode.classList.remove('visibility-visible')
      this.displayEditModal(customer)
    })
    let removeOption = createElement('li', 'remove-customer')
    removeOption.innerHTML = 'Remove'
    removeOption.addEventListener('click', (e) => {
      e.target.parentNode.classList.remove('visibility-visible')
      this.displayRemoveModal(customer.id)
    })
    dropdownMenu.append(editOption, removeOption)
    return dropdownMenu
  }

  renderTableFooter = (currentIndex) => {
    const currentPage = this.params[QUERY_PARAM_KEYS.page]
    const firstRecord = (currentPage - 1) * PAGE_SIZE + 1
    const lastRecord = (currentPage - 1) * PAGE_SIZE + currentIndex

    this.showingDataText.innerHTML = `
    Showing data ${firstRecord} to ${lastRecord}
    `

    this.previousBtn.classList.remove('visibility-hidden')
    this.nextBtn.classList.remove('visibility-hidden')
  }

  renderCustomersTable = (customers) => {
    //Disable next button in  last page
    if (!customers.length && this.params[QUERY_PARAM_KEYS.page] > 1) {
      this.params[QUERY_PARAM_KEYS.page] -= 1
      return
    }

    //Remove customer in table if exist
    this.customersTable.innerHTML = ''

    //Display empty notification
    if (!customers.length || customers === 'Not found') {
      this.displayEmptyNotification(LIST_EMPTY_MSG)
      this.showingDataText.innerHTML = ''
      this.previousBtn.classList.add('visibility-hidden')
      this.nextBtn.classList.add('visibility-hidden')
      return
    }

    //Render customers list
    let i = 0
    for (i; i < customers.length; i++) {
      let customer = customers[i]

      let customerRow = createElement('li', 'customer')

      //Render customer information
      for (let key in customer) {
        if (key === LIST_CUSTOMER_FIELD.id) continue
        if (key !== LIST_CUSTOMER_FIELD.status) {
          let customerProperty = createElement('p')
          customerProperty.innerHTML = customer[key]
          customerRow.appendChild(customerProperty)
        } else {
          let customerStatus = createElement('p', 'status-tag')
          if (customer.status === CUSTOMER_STATUS.on) {
            customerStatus.classList.add('status-active')
            customerStatus.innerHTML = STATUS_HTML.on
          } else {
            customerStatus.innerHTML = STATUS_HTML.off
          }
          customerRow.appendChild(customerStatus)
        }
      }

      //Render dropdown menu
      let dropdownMenuContainer = createElement(
        'div',
        'dropdown-menu-container',
      )

      let dropdownBtn = this.renderDropdownBtn()
      dropdownBtn.id = customer.id
      dropdownMenuContainer.appendChild(dropdownBtn)

      let dropdownMenu = this.renderDropdownMenu(customer)

      dropdownMenuContainer.appendChild(dropdownMenu)
      customerRow.appendChild(dropdownMenuContainer)
      this.customersTable.appendChild(customerRow)

      let customerDivider = createElement('div', 'customer-divider')
      this.customersTable.appendChild(customerDivider)
    }

    //Render table footer
    this.renderTableFooter(i)
  }

  validateFieldData = (input) => {
    const error = validateField(input.name, input.value)
    if (error) {
      this.displayFieldError(input, error)
    } else {
      this.hideFieldError(input)
    }
  }

  validateFormData = () => {
    for (let i = 0; i < this.inputFields.length; i++) {
      if (this.inputFields[i].name === LIST_CUSTOMER_FIELD.country) {
        this.inputFields[i].addEventListener('change', () =>
          this.validateFieldData(this.inputFields[i]),
        )
      } else {
        this.inputFields[i].addEventListener('blur', () =>
          this.validateFieldData(this.inputFields[i]),
        )
      }
    }
  }

  getFormData = () => {
    const formData = new FormData(this.form)
    const customer = [...formData.keys()].reduce((acc, key) => {
      acc[key] = formData.get(key)
      return acc
    }, {})
    if (!customer.status) customer.status = CUSTOMER_STATUS.off

    const errors = validateForm(customer)

    if (Object.keys(errors).length) {
      this.displayFormErrors(errors)
      return
    }
    return customer
  }

  bindSubmitModal = (handlerAdd, handlerEdit) => {
    this.submitBtn.addEventListener('click', (event) => {
      event.preventDefault()

      if (!this.customerID) {
        this.bindAddCustomer(handlerAdd)
      } else {
        this.bindEditCustomer(handlerEdit)
      }
    })
  }

  bindOpenModal = () => {
    this.addCustomerBtn.addEventListener('click', () => {
      this.customerID = null
      this.displayAddModal()
    })
  }

  bindCloseModal = () => {
    this.closeModalBtn.addEventListener('click', () => this.hideModal())

    this.cancelBtn.addEventListener('click', () => this.hideModal())

    this.closeRemoveModalBtn.addEventListener('click', () =>
      this.hideRemoveModal(),
    )

    this.denyRemoveBtn.addEventListener('click', () => this.hideRemoveModal())
  }

  bindAddCustomer = async (handler) => {
    const customer = this.getFormData()
    if (!customer) return
    this.displayLoading()

    try {
      await handler(customer)
      this.hideModal()
      this.displaySnackbar(SNACKBAR_STATUS.success, SNACKBAR_MSG.successAdd)
    } catch (error) {
      this.hideLoading()
      this.displaySnackbar(SNACKBAR_STATUS.failed, SNACKBAR_MSG.failed)
    }
  }

  bindEditCustomer = async (handler) => {
    const customer = this.getFormData()
    if (!customer) return
    this.displayLoading()

    try {
      await handler(customer, this.customerID)
      this.hideModal()
      this.displaySnackbar(SNACKBAR_STATUS.success, SNACKBAR_MSG.successEdit)
    } catch (error) {
      this.hideLoading()
      this.displaySnackbar(SNACKBAR_STATUS.failed, SNACKBAR_MSG.failed)
    }
  }

  bindDeleteCustomer = (handler) => {
    this.acceptRemoveBtn.addEventListener('click', async () => {
      const id = this.customerID
      this.displayLoading()

      try {
        await handler(id)
        this.hideRemoveModal()
        this.displaySnackbar(
          SNACKBAR_STATUS.success,
          SNACKBAR_MSG.successDelete,
        )
      } catch (error) {
        this.hideLoading()
        this.displaySnackbar(SNACKBAR_STATUS.failed, SNACKBAR_MSG.failed)
      }
    })
  }

  bindSearchDebounce = (handler) => {
    this.searchInput.addEventListener('keyup', () => {
      this.params[QUERY_PARAM_KEYS.search] = this.searchInput.value
      handler(this.params)
    })
  }

  bindSearchOnChanged = (handler) => {
    this.searchInput.addEventListener('change', () => {
      this.params[QUERY_PARAM_KEYS.search] = this.searchInput.value
      handler(this.params)
    })
  }

  bindSortOnChanged = (handler) => {
    this.sortOption.addEventListener('change', () => {
      this.params[QUERY_PARAM_KEYS.sort] = this.sortOption.value
      if (this.sortOption.value === LIST_CUSTOMER_FIELD.id) {
        this.params[QUERY_PARAM_KEYS.order] = 'desc'
      } else {
        this.params[QUERY_PARAM_KEYS.order] = 'asc'
      }

      handler(this.params)
    })
  }

  bindPagination = (handler) => {
    this.nextBtn.addEventListener('click', () => {
      this.params[QUERY_PARAM_KEYS.page] += 1
      this.disablePagination()
      handler(this.params)
    })

    this.previousBtn.addEventListener('click', () => {
      if (this.params[QUERY_PARAM_KEYS.page] > 1) {
        this.params[QUERY_PARAM_KEYS.page] -= 1
        this.disablePagination()
        handler(this.params)
      }
    })
  }
}
