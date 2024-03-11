import HttpService from "../../services/httpservice.js";
import { customerApi } from "../../constants/constants.js";

export class CustomerModel {
  constructor() {
    this.customers = {};
  }

  getAllCustomers = async () => {
    const path = customerApi + "?_sort=name&_order=desc";
    return HttpService.get(path);
  };

  addCustomer = async (data) => {
    await HttpService.post(customerApi, data);
  };

  editCustomer = async (id, data) => {
    const path = customerApi + "/" + id;
    await HttpService.put(path, data);
  };

  deleteCustomer = async (id) => {
    const path = customerApi + "/" + id;
    await HttpService.delete(path);
  };
}
