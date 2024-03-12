import HttpService from '../services/httpservice.js'
import { createPath } from '../utils/createPath.js'
import { customerApi } from '../constants/constants.js'

export class CustomerModel {
  getCustomers = async (params) => {
    const path = createPath(customerApi, params)
    return HttpService.get(path)
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
