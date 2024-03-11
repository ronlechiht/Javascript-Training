import { HttpService } from '../../service/service.js'
import { customerApi } from '../../constants/constants.js'

export class CustomerModel {
  constructor() {
    this.customers = {}
  }

  getAllCustomers = async () => {
    return await HttpService.get(customerApi)
  }

  addCustomer = async (data) => {
    await HttpService.post(customerApi, data)
  }

  editCustomer = async (id, data) => {
    const path = customerApi + '/' + id
    await HttpService.put(path, data)
  }

  deleteCustomer = async (id) => {
    const path = customerApi + '/' + id
    await HttpService.delete(path)
  }
}
