import { action, makeObservable, observable, runInAction } from 'mobx'
import employeeApi from '../API/employeeApi.js'
class EmployeeStore {
  date_emp = []
  current_emp = null
  constructor() {
    makeObservable(this, {
      date_emp: observable,
      current_emp: observable,
      addData: action,
      changeData: action,
      removeData: action,
    })

    this.getData()
  }
  async getData() {
    try {
      const response = await employeeApi.get()
      console.log(response)
      runInAction(() => {
        this.date_emp = response.data
        console.log('dataemp: ', this.date_emp)
        this.date_emp = [...this.date_emp]
        // sessionStorage.setItem("userName", "guest")
      })
    } catch (error) {
      console.log('getDataEmp', error)
    }
  }

  async addData(data) {
    try {
      console.log('add data ', data)
      const response = await employeeApi.post(data)
      runInAction(() => {
        this.data_rol = [...this.data_rol, response.data]
      })
      return response.status
    } catch {
      console.log('addDatamp', error)
      return response.status
    }
  }

  async changeData(data) {
    const id = data.id
    try {
      const response = await employeeApi.put(id, data)
      console.log('after API change data: ', response.data)
      runInAction(() => {
        this.date_emp.forEach((item, index) => {
          if (item.id === id) {
            this.date_emp[index] = response.data
          }
        })
        this.data_rol = [...this.data_rol]
      })
      console.log('changeDataEMP', response)
      return response.status
    } catch (error) {
      console.log('changeDataEMP', error)
      return error.response.status
    }
  }

  async removeData(id) {
    try {
      const response = await employeeApi.delete(id)
      runInAction(() => {
        this.date_emp = this.date_emp.filter((item) => item.id !== id) // שימוש בסימן "=" במקום במילת השוואה "=="
      })
    } catch (error) {
      console.log('removeDataEMP', error)
    }
  }
}
export default new EmployeeStore()
