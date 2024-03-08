import { HttpService } from '../../service/service.js'
import { customerApi } from '../../constants/constants.js'

export class CustomerModel {
  constructor() {
    this.customers = {}
  }

  async getAllCustomers() {
    return await HttpService.get(customerApi)
  }

  async addCustomer(data) {
    await HttpService.post(customerApi, data)
  }

  async editCustomer(id, data) {
    const path = customerApi + '/' + id
    await HttpService.put(path, data)
  }

  async deleteCustomer(id) {
    const path = customerApi + '/' + id
    await HttpService.delete(path)
  }
}
