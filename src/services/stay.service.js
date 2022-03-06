import Axios from 'axios'
import {storageService} from './async-storage.service.js'
import {httpService} from './http.service.js'
var axios = Axios.create({
    withCredentials: true
})

const STORAGE_KEY = 'stayDB'

export const stayService = {
  query,
  getById,
  save,
  remove,
}

async function query(filterBy) {
  try {
    console.log('filter in STAYSERVICE',filterBy)
    const res = await httpService.get('stay',filterBy)
    return res
    // const res = await storageService.query(STORAGE_KEY,filterBy)
    // console.log(res)
    // return res
  } catch (err) {
    console.log('Cannot get stays:',  err)
    throw err
  }
  // return axios.get(`http://localhost:3020/api/toy?name=${name}&inStock=${inStock}&labels=${JSON.stringify(labels)}&type=${type}&order=${order}`).then((res) => res.data)
}

async function getById(stayId) {
  // return axios
  //   .get(`http://localhost:3020/api/toy/${toyId}`)
  //   .then((res) => res.data)
  try {
    const res = await httpService.get(`stay/${stayId}`)
    // const res = await storageService.get(STORAGE_KEY,stayId)
    // console.log(res)
    // return res.data
    return res
  } catch (err) {
    console.log(`Cannot get stay with id: ${stayId}`)
    throw err
  }
}

async function save(toy) {
  try {
    if (toy._id) {
      const res = await axios.put(`http://localhost:3020/api/toy/${toy._id}`, toy)
      return res.data
    } else {
      const res = await axios.post('http://localhost:3020/api/toy/', toy)
      return res.data
    }
  } catch (err) {
    console.log('Cannot save toy', err)
    throw err
  }
  // if (toy._id)
  //   return axios.put(`http://localhost:3020/api/toy/${toy._id}`, toy)
  //     .then((res) => res.data)
  // else return axios.post('http://localhost:3020/api/toy/', toy).then((res) => res.data)
}

async function remove(toyId) {
  // return axios
  //   .delete(`http://localhost:3020/api/toy/${toyId}`)
  //   .then((res) => res.data)
  try {
    const res = await axios.delete(`http://localhost:3020/api/toy/${toyId}`)
    return res.data
  } catch (err) {
    console.log('Cannot remove toy:', err)
    throw err
  }
}
