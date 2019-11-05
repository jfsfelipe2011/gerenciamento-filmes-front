import axios from 'axios'

export default {
    state: {
        categoryList: []
    },
    mutations: {
        updateCategoryList (state, data) {
            state.categoryList = data
        }
    },
    actions: {
        getCategories (context) {
            axios(
                {
                    method: "GET",
                    "url":  process.env.VUE_APP_API_URL + '/api/categories',
                    "headers": { 
                        "Accept":        "application/json",
                        "Authorization": "Bearer " + localStorage.token 
                    }
                }
            ).then(response => {
                context.commit('updateCategoryList', response.data)
            })
        }
    }
}