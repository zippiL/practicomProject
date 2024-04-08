import loginApi from "../API/loginApi.js"
import { action, makeObservable, observable, runInAction } from 'mobx'

class LoginStore {
    async login(data) {
        try {
            const response = await loginApi.post(data)
            runInAction(() => {
              let  token = response.data.token
                sessionStorage.setItem('jwt', token)
                console.log(token);
            })
            return response.status
        } catch (error) {
            console.log('addDatamp', error)
            return error.response.status
        }
    }
}
export default new LoginStore()
