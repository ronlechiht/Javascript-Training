import {Service} from '../../service/service.js'

export class CustomerModel {
  constructor({ id, name, company, phone, email, country, status }) {
    this.id = id
    this.name = name
    this.company = company
    this.phone = phone
    this.email = email
    this.country = country
    this.status = status
  }
}

export class CustomerManagerModel {
  constructor() {
    this.customersApi = process.env.API_URL
  }

  async addCustomer(data) {
    await Service.post(this.customersApi,data)
  }
}
