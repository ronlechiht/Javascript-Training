import {
  SNACKBAR_DELAY,
  LIST_ERROR_MSG,
  LIST_EMPTY_MSG,
  PAGE_LIMIT,
  CUSTOMER_STATUS,
  SNACKBAR_STATUS,
  SNACKBAR_MSG,
  QUERY_PARAM_KEYS,
} from '../constants/constants'

import { validateForm } from '../utils/validation'

import { createElement } from '../utils/dom'

import { createDropdownBtn, createDropdownMenu } from '../utils/dropdown'

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
    this.status = this.form.querySelector('input[name="status"]')

    //Get button
    this.submitBtn = this.form.querySelector('.btn-submit')
    /*this.submitUpdateBtn = this.form.querySelector('.btn-submit-update')*/
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

    //Init params
    this.params = {
      _page: 1,
      _limit: PAGE_LIMIT,
    }

    //Customer ID for edit, delete feature
    this.customerID = null

    this.bindOpenModal()
    this.bindCloseModal()
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
    this.hideErrorMessages()
    this.resetInput()
  }

  hideRemoveModal = () => {
    this.removeModal.classList.remove('visibility-visible')
  }

  hideErrorMessages = () => {
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

  displaySnackbar = (status, message) => {
    this.snackbar.classList.add(status)
    this.snackbarMsg.innerHTML = message
    setTimeout(() => {
      this.snackbarMsg.innerHTML = ''
      this.snackbar.classList.remove(status)
    }, SNACKBAR_DELAY)
  }

  displayFormErrors = (errors) => {
    for (let key in errors) {
      let customerProperty = key
      let errorType = errors[key]
      let inputField = this.form.querySelector('.' + key)
      inputField.classList.add('error-field')
      let errorMessage = inputField.nextElementSibling
      errorMessage.innerHTML = LIST_ERROR_MSG[customerProperty][errorType]
    }
  }

  displayEmptyNotification = (message) => {
    let emptyMessage = createElement('p', 'empty-message')
    emptyMessage.innerHTML = message
    this.customersTable.appendChild(emptyMessage)
  }

  renderTableFooter = (currentIndex, totalCount) => {
    const currentPage = this.params[QUERY_PARAM_KEYS.page]
    const firstRecord = (currentPage - 1) * PAGE_LIMIT + 1
    const lastRecord = (currentPage - 1) * PAGE_LIMIT + currentIndex

    this.showingDataText.innerHTML = `
    Showing data ${firstRecord} to ${lastRecord} of ${totalCount} entries
    `

    if (currentPage === 1) this.previousBtn.classList.add('visibility-hidden')
    else this.previousBtn.classList.remove('visibility-hidden')

    if (totalCount - currentPage * PAGE_LIMIT <= 0)
      this.nextBtn.classList.add('visibility-hidden')
    else this.nextBtn.classList.remove('visibility-hidden')
  }

  renderCustomersTable = (customers, totalCount) => {
    while (this.customersTable.firstChild) {
      this.customersTable.removeChild(this.customersTable.firstChild)
    }

    if (!customers.length) {
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

      //Render dropdown menu
      let dropdownMenuContainer = createElement(
        'div',
        'dropdown-menu-container',
      )

      let dropdownBtn = createDropdownBtn()
      dropdownBtn.id = customer.id
      dropdownMenuContainer.appendChild(dropdownBtn)

      let dropdownMenu = createDropdownMenu(
        customer,
        this.displayEditModal,
        this.displayRemoveModal,
      )

      dropdownMenuContainer.appendChild(dropdownMenu)
      customerRow.appendChild(dropdownMenuContainer)
      this.customersTable.appendChild(customerRow)

      let customerDivider = createElement('div', 'customer-divider')
      this.customersTable.appendChild(customerDivider)
    }

    //Render table footer
    this.renderTableFooter(i, totalCount)
  }

  bindOpenModal = () => {
    this.addCustomerBtn.onclick = () => {
      this.customerID = null
      this.displayAddModal()
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
    if (!customer.status) customer.status = CUSTOMER_STATUS.off

    this.hideErrorMessages()
    const errors = validateForm(customer)

    if (Object.keys(errors).length) {
      this.displayFormErrors(errors)
      return
    }
    return customer
  }

  bindSubmitModal = (handlerAdd, handlerEdit) => {
    this.submitBtn.onclick = (event) => {
      event.preventDefault()

      if (!this.customerID) {
        this.bindAddCustomer(handlerAdd)
      } else {
        this.bindEditCustomer(handlerEdit)
      }
    }
  }

  bindAddCustomer = async (handler) => {
    const customer = this.getFormData()
    if (!customer) return

    try {
      await handler(customer)
      this.displaySnackbar(SNACKBAR_STATUS.success, SNACKBAR_MSG.successAdd)
      this.resetInput()
    } catch (error) {
      this.displaySnackbar(SNACKBAR_STATUS.failed, SNACKBAR_MSG.failed)
    }
  }

  bindEditCustomer = async (handler) => {
    const customer = this.getFormData()
    if (!customer) return

    try {
      await handler(customer, this.customerID)
      this.displaySnackbar(SNACKBAR_STATUS.success, SNACKBAR_MSG.successEdit)
    } catch (error) {
      this.displaySnackbar(SNACKBAR_STATUS.failed, SNACKBAR_MSG.failed)
    }
  }

  bindDeleteCustomer = (handler) => {
    this.acceptRemoveBtn.onclick = async () => {
      const id = this.customerID
      try {
        await handler(id)
        this.hideRemoveModal()
        this.displaySnackbar(
          SNACKBAR_STATUS.success,
          SNACKBAR_MSG.successDelete,
        )
      } catch (error) {
        this.displaySnackbar(SNACKBAR_STATUS.failed, SNACKBAR_MSG.failed)
      }
    }
  }

  bindSearchOnChanged = (handler) => {
    this.searchInput.onkeyup = () => {
      this.params[QUERY_PARAM_KEYS.search] = this.searchInput.value
      handler(this.params)
    }
  }

  bindSortOnChanged = (handler) => {
    this.sortOption.onchange = () => {
      this.params[QUERY_PARAM_KEYS.sort] = this.sortOption.value
      handler(this.params)
    }
  }

  bindPagination = (handler) => {
    this.nextBtn.onclick = () => {
      this.params[QUERY_PARAM_KEYS.page] += 1
      handler(this.params)
    }

    this.previousBtn.onclick = () => {
      this.params[QUERY_PARAM_KEYS.page] -= 1
      handler(this.params)
    }
  }
}
