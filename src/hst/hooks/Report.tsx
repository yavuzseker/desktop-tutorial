
import axios from "axios"
import { baseURL } from "src/hst/Configurations"

const useReport = () => {

    const sendReport = (data: { userId: number, message: string, reportUserId: number }) => {
        return new Promise((resolve, reject) => {
            axios.post(baseURL + "api/report/sendreport", data).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }

    const findReport = (id: number) => {
        return new Promise((resolve, reject) => {
            axios.get(baseURL + "api/report/findreportid?id=" + id).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }


    return {
        sendReport,
        findReport
    }

}

export { useReport }