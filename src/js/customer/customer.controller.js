import { debounce } from '../utils/debounce'
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
    this.displayCustomersTable(this.customerView.params)
  }

  displayCustomersTable = async (params) => {
    const res = await this.customerModel.getCustomers(params)
    const customers = await res.json()
    const totalCount = res.headers.get('x-total-count')
    this.customerView.renderCustomersTable(customers, totalCount)
  }

  handleAddCustomer = async (customer) => {
    await this.customerModel.addCustomer(customer)
    this.displayCustomersTable(this.customerView.params)
  }

  handleEditCustomer = async (customer, id) => {
    await this.customerModel.editCustomer(id, customer)
    this.displayCustomersTable(this.customerView.params)
  }

  handleDeleteCustomer = async (id) => {
    await this.customerModel.deleteCustomer(id)
    this.displayCustomersTable(this.customerView.params)
  }
}
