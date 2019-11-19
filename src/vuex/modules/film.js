import axios from 'axios'

export default {
    state: {
        filmList: [],
        filmView: {}
    },
    mutations: {
        updateFilmList (state, data) {
            state.filmList = data
        },
        updateFilmView (state, data) {
            state.filmView = data
        }
    },
    actions: {
        getFilms (context) {
            axios(
                {
                    method: "GET",
                    "url":  process.env.VUE_APP_API_URL + '/api/films?order=id,desc',
                    "headers": {
                        "Accept":        "application/json",
                        "Authorization": "Bearer " + localStorage.token
                    }
                }
            ).then(response => {
                context.commit('updateFilmList', response.data)
            })
        },
        getFilmsByCategoryId (context, id) {
            axios(
                {
                    method: "GET",
                    "url": process.env.VUE_APP_API_URL + '/api/films?filter=category_id,' + id,
                    "headers": {
                        "Accept":        "application/json",
                        "Authorization": "Bearer " + localStorage.token
                    }
                }
            ).then(response => {
                    context.commit('updateFilmList', response.data)
            })
        },
        getFilmById (context, id) {
            axios(
                {
                    method: "GET",
                    "url": process.env.VUE_APP_API_URL + '/api/films?filter=id,' + id,
                    "headers": {
                        "Accept":        "application/json",
                        "Authorization": "Bearer " + localStorage.token
                    }
                }
            ).then(response => {
                    context.commit('updateFilmView', response.data[0])
            })
        }
    }
}