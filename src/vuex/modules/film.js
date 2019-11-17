import axios from 'axios'

export default {
    state: {
        filmList: []
    },
    mutations: {
        updateFilmList (state, data) {
            state.filmList = data
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
        }
    }
}