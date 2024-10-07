export const getEvents = async (apiUrl: string) => {
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}