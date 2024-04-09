// employeeApi.js
import axios from 'axios'

class EmlpyeeAPI {
  constructor() {
    this.baseURL = 'https://localhost:7191/api/Auth'
  }
  async post(data) {
    const response = await axios.post(this.baseURL, data)
    return response
  }
}

export default new EmlpyeeAPI()
