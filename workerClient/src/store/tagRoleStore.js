// TagRoleStore.js
import { action, makeObservable, observable, runInAction, toJS } from 'mobx'
import tagRoleApi from '../API/tagRoleApi.js'

class TagRoleStore {
  data_rol = []

  constructor() {
    makeObservable(this, {
      data_rol: observable,
      addData: action,
      changeData: action,
      removeData: action,
    })

    this.getData()
  }

  async getData() {
    try {
      const response = await tagRoleApi.get()
      runInAction(() => {
        this.data_rol = response.data
      })
    } catch (error) {
      console.log('getDataEmp', error)
    }
  }

  async addData(data) {
    try {
      const response = await tagRoleApi.post(data)
      runInAction(() => {
        this.data_rol = [...this.data_rol, response.data]
      })
      console.log(this.data_rol)
      return response.status
    } catch (error) {
      console.log('addDatamp', error)
      return error.response.status
    }
  }
  async changeData(data) {
    const id = data.id
    try {
      const response = await tagRoleApi.put(id, data)
      runInAction(() => {
        this.data_rol.forEach((item, index) => {
          if (item.id === id) {
            this.data_rol[index] = response.data
          }
        })
        this.data_rol = [...this.data_rol]
      })
      return response.status
    } catch (error) {
      console.log('changeDataEMP', error)
      return error.response.status
    }
  }

  async removeData(id) {
    try {
      const response = await tagRoleApi.delete(id)
      runInAction(() => {
        this.data_rol = this.data_rol.filter((item) => item.id !== id)
      })
    } catch (error) {
      console.log('removeDataEMP', error)
    }
  }
}

export default new TagRoleStore()
