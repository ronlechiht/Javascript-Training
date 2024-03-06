import {HttpService} from '../../service/service.js'
import { customerApi } from '../../constants/constants.js'

export class CustomerModel {
  async addCustomer(data) {
    await HttpService.post(customerApi,data)
  }
}
