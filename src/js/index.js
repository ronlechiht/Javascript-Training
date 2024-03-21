import {
  CustomerModel,
  CustomerView,
  CustomerController,
} from './customer/index.js'

const customerApp = new CustomerController(
  new CustomerModel(),
  new CustomerView(),
)

customerApp()
