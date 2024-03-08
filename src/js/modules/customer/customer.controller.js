import { debounce } from '../../utils/utils'
export class CustomerController {
  constructor(customerModel, customerView) {
    this.customers = {}
    this.customerModel = customerModel
    this.customerView = customerView

    this.customerView.bindOpenModal()
    this.customerView.bindCloseModal()
    this.customerView.bindAddCustomer(this.handleAddCustomer)
    this.customerView.bindEditCustomer(this.handleEditCustomer)
    this.customerView.bindDeleteCustomer(this.handleDeleteCustomer)
    this.customerView.bindSearchOnChanged(debounce(this.handleReloadTable))
    this.customerView.bindSortOnChanged(this.handleReloadTable)
    this.customerView.bindPagination(this.handleReloadTable)
    this.getCustomersData(0)
  }

  async getCustomersData(pagination) {
    try {
      this.customers = await this.customerModel.getAllCustomers()
      this.displayCustomersTable(pagination)
    } catch (error) {
      console.log(error)
    }
  }

  displayCustomersTable(pagination) {
    this.customerView.renderCustomersTable(this.customers, pagination)
  }

  handleAddCustomer = async (customer) => {
    await this.customerModel.addCustomer(customer)
    this.getCustomersData(this.customerView.pagination)
  }

  handleEditCustomer = async (customer, id) => {
    await this.customerModel.editCustomer(id, customer)
    this.getCustomersData(this.customerView.pagination)
  }

  handleDeleteCustomer = async (id) => {
    await this.customerModel.deleteCustomer(id)
    this.getCustomersData(this.customerView.pagination)
  }

  handleReloadTable = (pagination) => this.displayCustomersTable(pagination)
}
