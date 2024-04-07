// employeeApi.js
import axios from 'axios';

class EmlpyeeAPI {
    constructor() {
        this.baseURL = "https://localhost:7191/api/Employee";
    }

    async get() {
        const response = await axios.get(this.baseURL);
        console.log(response); // הוסף קוד זה
        console.log(response.data); // הוסף קוד זה
        return response;
    }
    

    async getById(id) {
        const response = await axios.get(`${this.baseURL}/${id}`);
        return response;
    }

    async delete(id) {
        const response = await axios.delete(`${this.baseURL}/${id}`);
        return response;
    }

    async post(data) {
        const response = await axios.post(this.baseURL, data);
        return response;
    }

    async put(id, data) {
        const response = await axios.put(`${this.baseURL}/${id}`, data);
        return response;
    }
}

export default new EmlpyeeAPI;
