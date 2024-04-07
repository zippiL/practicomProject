// employeeApi.js
import axios from 'axios';

class TagRoleAPI {
baseURL="https://localhost:7191/api/TagRole";
    // constructor() {

    //     this.baseURL = "https://localhost:7191/api/TagRole";
    // }

    async get() {
        const response = await axios.get(this.baseURL);
        console.log(response); // הוסף קוד זה
        console.log(response.data); // הוסף קוד זה
        return response;
    }


    async getById(id) {
        const response = await axios.get(`${this.baseURL}/${id}`);
        return response.data;
    }
    async getName(id) {
        const res = await this.getById(id);
        return res.name;
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
        console.log("change data")
        console.log(data);
        console.log(this.baseURL);
        const response = await axios.put(`${this.baseURL}/${id}`, data);

        return response;
    }
}

export default new TagRoleAPI;
