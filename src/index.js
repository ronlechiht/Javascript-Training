import {
  CustomerManagerModel,
  CustomerView,
  CustomerController
} from './modules/customer/index.js'

const customerApp = new CustomerController(new CustomerManagerModel (), new CustomerView ())
