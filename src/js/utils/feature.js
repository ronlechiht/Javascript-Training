export function search(customers, searchValue) {
  const _customers = customers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(searchValue) ||
      customer.company.toLowerCase().includes(searchValue) ||
      customer.phone.toLowerCase().includes(searchValue) ||
      customer.email.toLowerCase().includes(searchValue) ||
      customer.country.toLowerCase().includes(searchValue)
    )
  })
  return _customers
}

export function sort(customers, sortType) {
  let _customers = customers

  if (sortType === 'none') return _customers

  _customers.sort((a, b) => {
    let conditionA = a[sortType].toLowerCase(),
      conditionB = b[sortType].toLowerCase()

    if (conditionA < conditionB) {
      return -1
    }
    if (conditionA > conditionB) {
      return 1
    }
    return 0
  })

  return _customers
}