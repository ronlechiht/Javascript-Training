export class CustomerController {
  constructor(customerManagerModel, customerView) {
    this.customerManagerModel = customerManagerModel
    this.customerView = customerView

    this.customerView.bindOpenCloseModal()
    this.customerView.bindAddCustomer(this.handleAddCustomer)
  }

  handleAddCustomer = (customer) => {
    if (this.customerView.validateForm(customer)) {
      this.customerManagerModel.addCustomer(customer)
      this.customerView.displaySnackbar('.successful')
      this.customerView.resetInput()
    } else {
      this.customerView.displaySnackbar('.failed')
    }
  }
}
