
import axios from "axios";

export const apiClient = axios.create(
    {
        //baseURL: 'http://localhost:8080'
         baseURL: 'http://ws-todos-env.eba-cve7nqvf.ap-south-1.elasticbeanstalk.com'
    }
)