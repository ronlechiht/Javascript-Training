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
    this.customerView.bindFirstLoad(this.handleFirstLoad)
  }

  handleFirstLoad = async () => {
    this.customerModel.customers = await this.customerModel.getAllCustomers()
    this.customerView.renderGeneralInformation(this.customerModel.customers)
    this.customerView.renderCustomersTable(this.customerModel.customers, 0)
  }

  handleAddCustomer = async (customer) => {
    await this.customerModel.addCustomer(customer)
    this.customerView.bindFirstLoad(this.handleFirstLoad)
  }

  handleEditCustomer = async (customer, id) => {
    await this.customerModel.editCustomer(id, customer)
    this.customerView.bindFirstLoad(this.handleFirstLoad)
  }

  handleDeleteCustomer = async (id) => {
    await this.customerModel.deleteCustomer(id)
    this.customerView.bindFirstLoad(this.handleFirstLoad)
  }

  handleReloadTable = (pagination) =>
    this.customerView.renderCustomersTable(
      this.customerModel.customers,
      pagination
    )
}
