import axios from "axios"

const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newContact => {
    const request = axios.post(baseUrl, newContact)
    return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
}

const update = (id, changedNumber) => {
    const request = axios.put(`${baseUrl}/${id}`, changedNumber)
    return request.then(response => response.data)
}

export default { create, getAll, remove, update }