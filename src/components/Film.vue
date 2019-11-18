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
                                        height="500px"
                                >
                                    <v-card-title v-text="film.name"></v-card-title>
                                </v-img>

                                <v-card-actions>
                                    <v-spacer></v-spacer>

                                    <v-btn class="ma-2" color="primary" dark>Alugar
                                        <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
                                    </v-btn>

                                    <v-btn icon>
                                        <v-icon>mdi-message-text</v-icon>
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

        created() {
            localStorage.categoryId = this.$route.params.categoryId;
            this.$store.dispatch('getFilmsByCategoryId', this.$route.params.categoryId)
            this.$store.dispatch('getCategory', this.$route.params.categoryId)
        }
    }
</script>