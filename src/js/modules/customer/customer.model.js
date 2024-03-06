import { HttpService } from '../../service/service.js'
import { customerApi } from '../../constants/constants.js'

export class CustomerModel {
  async getAllCustomers() {
    return await HttpService.get(customerApi)
  }

  async addCustomer(data) {
    await HttpService.post(customerApi, data)
  }
}
