<template>
    <v-container>
        <v-layout class="justify-center">
            <v-flex xs10>
                <v-container fluid>
                    <h1 class="display-1 font-weight-bold mb-5">
                        Filmes da categoria {{ category.name }}
                    </h1>

                    <v-row dense>
                        <v-col
                                v-for="(film, index) in films"
                                :key="index"
                                :cols="flex"
                        >
                            <v-card>
                                <v-img
                                        :src="urlBase + film.image"
                                        class="white--text align-end"
                                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                        height="450"
                                >
                                    <v-card-title v-text="film.name"></v-card-title>
                                </v-img>

                                <v-card-actions>
                                    <v-spacer></v-spacer>

                                    <form autocomplete="off" @submit.prevent="alugar(film)">
                                        <div v-if="film.stock">
                                            <v-btn type="submit" v-if="film.stock.quantity > 0" class="ma-2" color="primary" dark>Alugar
                                                <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
                                            </v-btn>

                                            <v-btn v-else class="ma-2" color="default" dark disabled>Alugar
                                                <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
                                            </v-btn>
                                        </div>

                                        <v-btn v-else class="ma-2" color="default" dark disabled>Alugar
                                            <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
                                        </v-btn>
                                    </form>

                                    <v-btn icon>
                                        <router-link :to="'/description/' + film.id" tag="li">
                                            <v-icon>mdi-message-text</v-icon>
                                        </router-link>    
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            flex: 3,
            urlBase: process.env.VUE_APP_STORAGE
        }),

        computed: {
            films () {
                if (localStorage.categoryId !== this.$route.params.categoryId) {
                    this.$store.dispatch('getFilmsByCategoryId', this.$route.params.categoryId)
                    this.$store.dispatch('getCategory', this.$route.params.categoryId)

                    localStorage.categoryId = this.$route.params.categoryId;
                }
                return this.$store.state.film.filmList
            },
            category () {
                return this.$store.state.category.categoryView
            }
        },

        methods: {
            alugar: function (film) {
                if (localStorage.filmsRented === undefined) {
                    let films = []
                    films[0] = film

                    localStorage.setItem("filmsRented", JSON.stringify(films))
                } else {
                    let films = []
                    let count = 0

                    let filmsRented = JSON.parse(localStorage.getItem("filmsRented"))

                    filmsRented.forEach(function (filmRented) {
                        if (filmRented.id !== film.id) {
                            films[count] = filmRented
                            count++
                        }
                    })

                    films[count] = film

                    localStorage.setItem("filmsRented", JSON.stringify(films));
                }

                this.$router.push('/user')
            }
        },

        created() {
            localStorage.categoryId = this.$route.params.categoryId;
            this.$store.dispatch('getFilmsByCategoryId', this.$route.params.categoryId)
            this.$store.dispatch('getCategory', this.$route.params.categoryId)
        }
    }
</script>