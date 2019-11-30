<template>
    <v-container>
        <v-layout class="justify-center">
            <v-flex xs10>
                <v-container fluid>
                    <div class="flash">
                        <flash-message></flash-message>
                    </div>

                    {{ rents }}

                    <h2>Filmes no carrinho</h2>

                    <v-simple-table height="700px">
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-left">Nome</th>
                                <th class="text-left">Imagem</th>
                                <th class="text-left">Lançamento</th>
                                <th class="text-left">Categoria</th>
                                <th class="text-left">Ações</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="film in films" :key="film.id">
                                <td>{{ film.name }}</td>
                                <td>
                                    <v-img
                                            :src="urlBase + film.image"
                                            width="100"
                                            height="150"
                                    ></v-img>
                                </td>
                                <td>{{ film.release_date }}</td>
                                <td>{{ film.category.name }}</td>
                                <td>
                                    <v-btn class="ma-2" color="red" dark>Remover
                                        <v-icon dark right>mdi-close</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4"></td>
                                <td style="display: block">
                                    <v-btn class="ma-2" color="orange darken-2" dark>
                                        <router-link :to="'/'" tag="li">
                                            <v-icon dark left>mdi-arrow-left</v-icon>Continuar
                                        </router-link>
                                    </v-btn>

                                    <v-btn class="ma-2" color="primary" dark>Alugar
                                        <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-container>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                films: JSON.parse(localStorage.getItem("filmsRented")),
                urlBase: process.env.VUE_APP_STORAGE
            }
        },

        computed: {
            customer () {
                return this.$store.state.customer.customerView
            },
            rents() {
                this.$store.dispatch('getRentsByCustomerId', this.customer.id)

                return this.$store.state.rent.rentsList
            }
        },

        created() {
            if (localStorage.filmsRented === undefined) {
                this.flash('Nenhum filme selecionado para aluguel!', 'error', {
                    timeout: 3000
                })

                this.$router.push('/')
            }

            this.$store.dispatch('getCustomerByDocument', this.$route.params.document)
            localStorage.document = this.$route.params.document
        }
    }
</script>