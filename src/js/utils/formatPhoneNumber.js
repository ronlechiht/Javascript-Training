//Convert string 10 digits to number phone format
export const formatPhoneNumber = (inputField) => {
  const input = inputField.value
  if (input.length === 10) {
    const zip = input.substring(0, 3)
    const middle = input.substring(3, 6)
    const last = input.substring(6, 10)

    inputField.value = `(${zip}) ${middle}-${last}`
  }
}
