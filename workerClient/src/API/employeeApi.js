import axios from 'axios'

class EmployeeAPI {
  constructor() {
    this.baseURL = 'https://localhost:7191/api/Employee'
  }

  async get() {
    const token = sessionStorage.getItem('jwt') // Get the token from sessionStorage
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.get(this.baseURL, { headers })
    console.log(response.data)
    return response
  }

  async getById(id) {
    const token = sessionStorage.getItem('jwt') // Get the token from sessionStorage
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.get(`${this.baseURL}/${id}`, { headers })
    return response
  }

  async delete(id) {
    const token = sessionStorage.getItem('jwt') // Get the token from sessionStorage
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.delete(`${this.baseURL}/${id}`, { headers })
    return response
  }

  async post(data) {
    const token = sessionStorage.getItem('jwt') // Get the token from sessionStorage
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.post(this.baseURL, data, { headers })
    return response
  }

  async put(id, data) {
    console.log('put  ' + JSON.stringify(data))
    const token = sessionStorage.getItem('jwt') // Get the token from sessionStorage
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.put(`${this.baseURL}/${id}`, data, { headers })
    return response
  }
}

export default new EmployeeAPI()
