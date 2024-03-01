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
    this.customersApi = 'https://customers-json-server.vercel.app/customers'
  }

  async addCustomer(data) {
    fetch(this.customersApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }
}
