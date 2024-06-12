import axios from "axios";

const baseURL = "https://bumbingo.hstplanet.com/"
//const baseURL = "http://192.168.1.102:5055/"

const service = axios.create({
    baseURL: baseURL,
    timeout: 4000,
})

export { service, baseURL }