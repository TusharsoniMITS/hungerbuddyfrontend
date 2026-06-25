import axios from "axios";
const serverURL = 'http://localhost:4000'
async function postData(url, body) {
    try {
        var response = await axios.post(`${serverURL}/${url}`, body)
        var data = response.data
        return (data)
    } catch (error) {
        return (error)
    }
}
async function getData(url) {
    try {
        var response = await axios.get(`${serverURL}/${url}`)
        var data = response.data
        return (data)
    } catch (error) {
        return (error)
    }
}

function getDate() {
    var cd = new Date()
    return (`${cd.getFullYear()}/${cd.getMonth() + 1}/${cd.getDate()}`)
}

function getTime() {
    var cd = new Date()
    return (`${cd.getHours()}:${cd.getMinutes()}:${cd.getSeconds()}`)
}

export { postData, serverURL, getDate, getTime, getData }