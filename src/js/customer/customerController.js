import { debounce } from '../utils/debounce'
import {
  SNACKBAR_STATUS,
  SNACKBAR_MSG,
  QUERY_PARAM_KEYS,
} from '../constants/constants'
export class CustomerController {
  constructor(customerModel, customerView) {
    this.customerModel = customerModel
    this.customerView = customerView

    this.customerView.bindSubmitModal(
      this.handleAddCustomer,
      this.handleEditCustomer,
    )
    this.customerView.bindDeleteCustomer(this.handleDeleteCustomer)
    this.customerView.bindSearchDebounce(debounce(this.displayCustomersTable))
    this.customerView.bindSearchOnChanged(this.displayCustomersTable)
    this.customerView.bindSortOnChanged(this.displayCustomersTable)
    this.customerView.bindPagination(this.displayCustomersTable)
    this.displayGeneralInformation()
    this.displayCustomersTable(this.customerView.params)
  }

  displayGeneralInformation = async () => {
    try {
      const { totalCustomers, totalActiveCustomers } =
        await this.customerModel.getGeneralInformation()
      this.customerView.customersQuantity.innerHTML = totalCustomers
      this.customerView.activeQuantity.innerHTML = totalActiveCustomers
    } catch (error) {
      this.customerView.displaySnackbar(
        SNACKBAR_STATUS.failed,
        SNACKBAR_MSG.failed,
      )
    }
  }

  displayCustomersTable = async (params) => {
    this.customerView.displayLoading()
    try {
      const customers = await this.customerModel.getCustomers(params)
      this.customerView.hideLoading()
      //Next pagination unavailable at last page
      if (
        !customers.length &&
        this.customerView.params[QUERY_PARAM_KEYS.page] > 1
      ) {
        this.customerView.params[QUERY_PARAM_KEYS.page] -= 1
        this.customerView.displaySnackbar(
          SNACKBAR_STATUS.failed,
          SNACKBAR_MSG.lastPage,
        )
        this.customerView.nextBtn.disabled = true
        return
      }
      //Display an empty notification list when there are no search results or no customers in the list
      if (customers === 'Not found' || !customers.length) {
        this.customerView.renderEmptyTable()
      }
      //Display table of customers
      else {
        this.customerView.renderCustomersTable(customers)
      }
    } catch (error) {
      this.customerView.hideLoading()
      this.customerView.displaySnackbar(
        SNACKBAR_STATUS.failed,
        SNACKBAR_MSG.failed,
      )
    }
  }

  handleAddCustomer = async (customer) => {
    await this.customerModel.addCustomer(customer)
    await this.displayGeneralInformation()
    await this.displayCustomersTable(this.customerView.params)
  }

  handleEditCustomer = async (customer, id) => {
    await this.customerModel.editCustomer(id, customer)
    await this.displayGeneralInformation()
    await this.displayCustomersTable(this.customerView.params)
  }

  handleDeleteCustomer = async (id) => {
    await this.customerModel.deleteCustomer(id)
    //Load previous page if delete last customer
    if (this.customerView.customersTable.children.length === 2) {
      this.customerView.params[QUERY_PARAM_KEYS.page] -= 1
    }
    await this.displayGeneralInformation()
    await this.displayCustomersTable(this.customerView.params)
  }
}
