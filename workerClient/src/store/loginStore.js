import loginApi from '../API/loginApi.js'
import { action, makeObservable, observable, runInAction } from 'mobx'
import employeeStore from './employeeStore.js'
import tagRoleStore from './tagRoleStore.js'

class LoginStore {
  async login(data) {
    try {
      const response = await loginApi.post(data)
      runInAction(() => {
        let token = response.data.token
        sessionStorage.setItem('jwt', token)
        sessionStorage.setItem('userName', data.userName)

        console.log(token)
        employeeStore.getData()
        tagRoleStore.getData()
      })
      return response.status
    } catch (error) {
      console.log('addDatamp', error)
      return error.response.status
    }
  }
}
export default new LoginStore()
