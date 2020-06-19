import {useState} from 'react'
import axios from 'axios'

const initialRequestInfo = {
    error: null,
    data: null,
    loading: false,
}

export default function useApi(config) {

    const [requestInfo, setRequestInfo] = useState(initialRequestInfo)

   async function call(localConfig) {
        setRequestInfo({
            ...initialRequestInfo,
            loading: true,
        })

    let res = null

    try {

        res =  await axios({
            baseURL: 'http://localhost:5000',
            ...config,
            ...localConfig
        })
        setRequestInfo({
         ...initialRequestInfo,
         data: res.data
     })

    }catch (error) {
        setRequestInfo({
            ...initialRequestInfo,
            error,
        })
   
    }

    if (config.onCompleted) {
        config.onCompleted(res)
        }
    }
     
    return [
        call,
        requestInfo
    ]
}