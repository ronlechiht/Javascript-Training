import {
  snackbarDelay,
  errorMessageList,
  listEmptyMessage,
  pageLimit,
  CUSTOMER_STATUS,
  SNACKBAR_STATUS,
  SNACKBAR_MSG,
} from '../constants/constants'

import { validateForm } from '../utils/validation'

import { createElement } from '../utils/dom'

import { createDropdownBtn } from '../utils/dropdown'

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
    this.addTitle = this.modal.querySelector('.add-title')
    this.updateTitle = this.modal.querySelector('.update-title')
    this.removeTitle = this.removeModal.querySelector('.modal-title')

    //Get submit form
    this.form = this.modal.querySelector('.submit-form')

    //Get input field
    this.inputFields = this.form.querySelectorAll('.input-field')
    this.status = this.form.querySelector('input[name="status"]')

    //Get button
    this.submitBtn = this.form.querySelector('.btn-submit')
    this.submitUpdateBtn = this.form.querySelector('.btn-submit-update')
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
      _limit: pageLimit,
    }

    this.bindOpenModal()
    this.bindCloseModal()
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
    this.hideErrorMessages()
    this.resetInput()
  }

  hideRemoveModal = () => {
    this.removeModal.classList.remove('visibility-visible')
    this.removeTitle.classList.remove('visibility-visible')
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
    }, snackbarDelay)
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
  }

  renderCustomersTable = (customers, totalCount) => {
    const pagination = this.params['_page']

    while (this.customersTable.firstChild) {
      this.customersTable.removeChild(this.customersTable.firstChild)
    }

    if (!customers.length) {
      this.displayEmptyNotification(listEmptyMessage)
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

    //Render table footer
    this.showingDataText.innerHTML =
      'Showing data ' +
      ((pagination - 1) * pageLimit + 1) +
      ' to ' +
      ((pagination - 1) * pageLimit + i) +
      ' of ' +
      totalCount +
      ' entries'

    if (pagination === 1) this.previousBtn.classList.add('visibility-hidden')
    else this.previousBtn.classList.remove('visibility-hidden')

    if (totalCount - pagination * pageLimit <= 0)
      this.nextBtn.classList.add('visibility-hidden')
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
    if (!customer.status) customer.status = CUSTOMER_STATUS.OFF

    this.hideErrorMessages()
    const errors = validateForm(customer)

    if (Object.keys(errors).length) {
      this.displayFormErrors(errors)
      return
    }
    return customer
  }

  bindAddCustomer(handler) {
    this.submitBtn.onclick = async (event) => {
      event.preventDefault()
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
  }

  bindEditCustomer = (handler) => {
    this.submitUpdateBtn.onclick = async (event) => {
      event.preventDefault()
      const id = this.submitUpdateBtn.id
      const customer = this.getFormData()
      if (!customer) return

      try {
        await handler(customer, id)
        this.displaySnackbar(SNACKBAR_STATUS.success, SNACKBAR_MSG.successEdit)
      } catch (error) {
        this.displaySnackbar(SNACKBAR_STATUS.failed, SNACKBAR_MSG.failed)
      }
    }
  }

  bindDeleteCustomer = (handler) => {
    this.acceptRemoveBtn.onclick = async () => {
      const id = this.acceptRemoveBtn.id
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
      this.params['name_like'] = this.searchInput.value
      handler(this.params)
    }
  }

  bindSortOnChanged = (handler) => {
    this.sortOption.onchange = () => {
      this.params['_sort'] = this.sortOption.value
      handler(this.params)
    }
  }

  bindPagination = (handler) => {
    this.nextBtn.onclick = () => {
      this.params['_page'] += 1
      handler(this.params)
    }

    this.previousBtn.onclick = () => {
      this.params['_page'] -= 1
      handler(this.params)
    }
  }
}
