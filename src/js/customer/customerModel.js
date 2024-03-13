import HttpService from '../services/httpsService.js'

export class CustomerModel {
  constructor() {
    this.customerApi = process.env.API_URL + '/customers'
    this.generalApi = process.env.API_URL + '/general'
  }

  getCustomers = async (params) => {
    const res = await HttpService.get(this.customerApi, params)
    const customers = await res.json()
    const totalCount = res.headers.get('x-total-count')
    return {
      data: customers,
      metadata: {
        totalCount,
      },
    }
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
    const generalInformation = await res.json()
    const totalCustomers = generalInformation[0]['totalCustomers']
    const totalActiveCustomers = generalInformation[0]['totalActiveCustomers']
    return { totalCustomers, totalActiveCustomers }
  }
}
