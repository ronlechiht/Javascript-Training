import {
  CustomerModel,
  CustomerView,
  CustomerController,
} from "./modules/customer/index.js";

const customerApp = new CustomerController(
  new CustomerModel(),
  new CustomerView(),
);
