import { debounce } from '../utils/debounce'
import { SNACKBAR_STATUS, SNACKBAR_MSG } from '../constants/constants'
export class CustomerController {
  constructor(customerModel, customerView) {
    this.customerModel = customerModel
    this.customerView = customerView

    this.customerView.bindSubmitModal(
      this.handleAddCustomer,
      this.handleEditCustomer,
    )
    this.customerView.bindDeleteCustomer(this.handleDeleteCustomer)
    this.customerView.bindSearchOnChanged(debounce(this.displayCustomersTable))
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
    try {
      const customers = await this.customerModel.getCustomers(params)
      this.customerView.renderCustomersTable(customers)
    } catch (error) {
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
    await this.displayGeneralInformation()
    await this.displayCustomersTable(this.customerView.params)
  }
}
