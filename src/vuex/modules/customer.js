import axios from 'axios'

export default {
    state: {
        customerView: {}
    },
    mutations: {
        updateCustomerList (state, data) {
            state.customerView = data
        }
    },
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
        },
        getCustomerByDocument (context, document) {
            axios (
                {
                    method: "GET",
                    "url": process.env.VUE_APP_API_URL + '/api/customers/' + document,
                    "headers": {
                        "Accept":        "application/json",
                        "Authorization": "Bearer " + localStorage.token
                    }
                }
            ).then(response => {
                context.commit('updateCustomerList', response.data)
            })
        }
    }
}