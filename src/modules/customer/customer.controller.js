export class CustomerController {
  constructor(customerManagerModel, customerView) {
    this.customerManagerModel = customerManagerModel
    this.customerView = customerView

    this.customerView.bindOpenModal()
    this.customerView.bindCloseModal()
    this.customerView.bindAddCustomer(this.handleAddCustomer)
  }

  handleAddCustomer = async (customer) => {
    const errors = this.customerView.validateForm(customer)
    if (Object.keys(errors).length === 0) {
      try {
        await this.customerManagerModel.addCustomer(customer)
        this.customerView.displaySnackbar('.successful')
        this.customerView.resetInput()
      }
      catch (error) {
        this.customerView.displaySnackbar('.failed')
      }
    } else this.customerView.displayFormErrors(errors)
  }
}
