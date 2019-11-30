import axios from 'axios'

export default {
    actions: {
        newCustomer (context, data) {
            return axios(
                {
                    method: "POST",
                    "url":  process.env.VUE_APP_API_URL + '/api/customers',
                    "data": data,
                    "headers": {
                        "Accept":        "application/json",
                        "Authorization": "Bearer " + localStorage.token
                    }
                }
            )
        }
    }
}