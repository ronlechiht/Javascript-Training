import { debounce } from '../utils/debounce'
import { SNACKBAR_STATUS, SNACKBAR_MSG } from '../constants/constants'
export class CustomerController {
  constructor(customerModel, customerView) {
    this.customerModel = customerModel
    this.customerView = customerView

    this.customerView.bindAddCustomer(this.handleAddCustomer)
    this.customerView.bindEditCustomer(this.handleEditCustomer)
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
      const {
        data: customers,
        metadata: { totalCount },
      } = await this.customerModel.getCustomers(params)
      this.customerView.renderCustomersTable(customers, totalCount)
    } catch (error) {
      this.customerView.displaySnackbar(
        SNACKBAR_STATUS.failed,
        SNACKBAR_MSG.failed,
      )
    }
  }

  handleAddCustomer = async (customer) => {
    await this.customerModel.addCustomer(customer)
    this.displayGeneralInformation()
    this.displayCustomersTable(this.customerView.params)
  }

  handleEditCustomer = async (customer, id) => {
    await this.customerModel.editCustomer(id, customer)
    this.displayGeneralInformation()
    this.displayCustomersTable(this.customerView.params)
  }

  handleDeleteCustomer = async (id) => {
    await this.customerModel.deleteCustomer(id)
    this.displayGeneralInformation()
    this.displayCustomersTable(this.customerView.params)
  }
}
