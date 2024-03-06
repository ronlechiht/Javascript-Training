export class CustomerController {
  constructor(customerModel, customerView) {
    this.customerModel = customerModel
    this.customerView = customerView

    this.customerView.bindOpenModal()
    this.customerView.bindCloseModal()
    this.customerView.bindAddCustomer(this.handleAddCustomer)
  }

  handleAddCustomer = async (customer) => {
    await this.customerModel.addCustomer(customer)
  }
}
