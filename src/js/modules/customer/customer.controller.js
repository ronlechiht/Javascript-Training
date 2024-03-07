import { debounce } from '../../utils/utils'
export class CustomerController {
  constructor(customerModel, customerView) {
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
    this.displayCustomersTable(0)
  }

  async displayCustomersTable(pagination) {
    try {
      const customers = await this.customerModel.getAllCustomers()
      this.customerView.renderCustomersTable(customers, pagination)
    } catch (error) {
      console.log(error)
    }
  }

  handleAddCustomer = async (customer) => {
    await this.customerModel.addCustomer(customer)
    this.displayCustomersTable(this.customerView.pagination)
  }

  handleEditCustomer = async (customer, id) => {
    await this.customerModel.editCustomer(id, customer)
    this.displayCustomersTable(this.customerView.pagination)
  }

  handleDeleteCustomer = async (id) => {
    await this.customerModel.deleteCustomer(id)
    this.displayCustomersTable(this.customerView.pagination)
  }

  handleReloadTable = (pagination) => this.displayCustomersTable(pagination)
}
