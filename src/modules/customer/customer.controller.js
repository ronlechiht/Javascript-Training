export class CustomerController {
  constructor(customerManagerModel, customerView) {
    this.customerManagerModel = customerManagerModel
    this.customerView = customerView

    this.customerView.bindOpenCloseModal()
    this.customerView.bindAddCustomer(this.handleAddCustomer)
  }

  handleAddCustomer = async (customer) => {
    if (this.customerView.validateForm(customer)) {
      try {
        await this.customerManagerModel.addCustomer(customer)
        this.customerView.displaySnackbar('.successful')
        this.customerView.resetInput()
      }
      catch (error) {
        this.customerView.displaySnackbar('.failed')
      }
    }
  }
}
