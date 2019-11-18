import axios from 'axios'

export default {
    state: {
        categoryList: [],
        categoryView: {}
    },
    mutations: {
        updateCategoryList (state, data) {
            state.categoryList = data
        },
        updateCategoryView (state, data) {
            state.categoryView = data
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
        },
        getCategory (context, id) {
            axios(
                {
                    method: "GET",
                    "url":  process.env.VUE_APP_API_URL + '/api/categories/' + id,
                    "headers": { 
                        "Accept":        "application/json",
                        "Authorization": "Bearer " + localStorage.token 
                    }
                }
            ).then(response => {
                context.commit('updateCategoryView', response.data)
            })
        }
    }
}