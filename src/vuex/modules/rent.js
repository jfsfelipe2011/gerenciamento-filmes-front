import axios from 'axios'

export default {
    state: {
        rentsList: []
    },
    mutations: {
        updateRentsList (state, data) {
            state.rentsList = data
        }
    },
    actions: {
        getRentsByCustomerId (context, id) {
            axios(
                {
                    method: "GET",
                    "url": process.env.VUE_APP_API_URL + '/api/customers/' + id + '/rents',
                    "headers": {
                        "Accept":        "application/json",
                        "Authorization": "Bearer " + localStorage.token
                    }
                }
            ).then(response => {
                context.commit('updateRentsList', response.data)
            })
        },
        newRent (context, data) {
            return axios(
                {
                    method: "POST",
                    "url":  process.env.VUE_APP_API_URL + '/api/rents',
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