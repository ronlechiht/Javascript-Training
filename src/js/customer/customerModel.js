import HttpService from '../services/httpsService.js'

export class CustomerModel {
  constructor() {
    this.customerApi = process.env.API_URL + '/customers'
    this.generalApi = process.env.API_URL + '/general'
  }

  getCustomers = async (params) => {
    return HttpService.get(this.customerApi, params)
  }

  addCustomer = async (data) => {
    await HttpService.post(this.customerApi, data)
  }

  editCustomer = async (id, data) => {
    await HttpService.put(id, this.customerApi, data)
  }

  deleteCustomer = async (id) => {
    await HttpService.delete(id, this.customerApi)
  }

  getGeneralInformation = async () => {
    const res = await HttpService.get(this.generalApi)
    const totalCustomers = res[0]['totalCustomers']
    const totalActiveCustomers = res[0]['totalActiveCustomers']
    return { totalCustomers, totalActiveCustomers }
  }
}
