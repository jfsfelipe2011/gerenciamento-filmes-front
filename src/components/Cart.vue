<template>
    <v-container>
        <v-layout class="justify-center">
            <v-flex xs10>
                <v-container fluid>
                    <div class="flash">
                        <flash-message></flash-message>
                    </div>

                    <h2>Filmes no carrinho</h2>

                    <v-simple-table height="400px">
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-left">Nome</th>
                                <th class="text-left">Imagem</th>
                                <th class="text-left">Lançamento</th>
                                <th class="text-left">Categoria</th>
                                <th class="text-left">Valor</th>
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
                                <td>{{ film.stock.value }}</td>
                                <td>
                                    <v-btn class="ma-2" color="red" dark @click="remover(film.id)">Remover
                                        <v-icon dark right>mdi-close</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>

                    <v-btn class="ma-2" color="orange darken-2" dark>
                        <router-link :to="'/'" tag="li">
                            <v-icon dark left>mdi-arrow-left</v-icon>Continuar
                        </router-link>
                    </v-btn>

                    <v-btn class="ma-2" color="primary" dark @click="alugar">Alugar
                        <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
                    </v-btn>

                    <br><br>

                    <h2>Histórico de alugueis</h2>

                    <v-simple-table height="400px">
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-left">Data Inicio</th>
                                <th class="text-left">Data Fim</th>
                                <th class="text-left">Data Entrega</th>
                                <th class="text-left">Status</th>
                                <th class="text-left">Valor</th>
                                <th class="text-left">Filmes</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="rent in rents" :key="rent.id">
                                <td>{{ rent.start_date }}</td>
                                <td>{{ rent.end_date }}</td>
                                <td>{{ rent.delivery_date }}</td>
                                <td>
                                    <span v-if="rent.status === 'finished'">Entregue</span>
                                    <span v-else-if="rent.status === 'rented'">Em aberto</span>
                                    <span v-else-if="rent.status === 'late'">Atrasado</span>
                                    <span v-else>Cancelado</span>
                                </td>
                                <td>{{ rent.value }}</td>
                                <td>
                                    <ul>
                                        <li v-for="film in rent.films" :key="film.id">
                                            {{ film.name }}
                                        </li>
                                    </ul>
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
                return this.$store.state.rent.rentsList
            }
        },

        methods: {
            remover: function (id) {
                let films = []
                let count = 0

                let filmsRented = JSON.parse(localStorage.getItem("filmsRented"))

                filmsRented.forEach(function (filmRented) {
                    if (filmRented.id !== id) {
                        films[count] = filmRented
                        count++
                    }
                })

                if (filmsRented.length === 1) {
                    this.flash('Nenhum filme selecionado para aluguel!', 'error', {
                        timeout: 3000
                    })

                    this.$router.push('/')
                }

                localStorage.setItem("filmsRented", JSON.stringify(films));

                this.flash('Filme removido do carrinho com sucesso!', 'success', {
                    timeout: 3000
                })
                location.reload()
            },
            alugar: function () {
                let now = new Date()
                let dia  = now.getDate().toString()
                let diaFull = (dia.length === 1) ? '0'+dia : dia
                let mes  = (now.getMonth()+1).toString()
                let mesFull = (mes.length === 1) ? '0'+mes : mes
                let anoFull = now.getFullYear()

                let start_date_string = anoFull + '-' + mesFull + '-' + diaFull

                let end_date = new Date()
                end_date.setDate(end_date.getDate() + 7)
                let end_dia  = end_date.getDate().toString()
                let end_diaFull = (end_dia.length === 1) ? '0'+dia : dia
                let end_mes  = (end_date.getMonth()+1).toString()
                let end_mesFull = (end_mes.length === 1) ? '0'+mes : mes
                let end_anoFull = end_date.getFullYear()

                let end_date_string =  end_anoFull + '-' + end_mesFull + '-' + end_diaFull

                let films = []
                let count = 0

                let filmsRented = JSON.parse(localStorage.getItem("filmsRented"))

                filmsRented.forEach(function (filmRented) {
                    films[count] = filmRented.id
                    count++
                })

                let newRent = {
                    start_date: start_date_string,
                    end_date: end_date_string,
                    customer_id: this.customer.id,
                    films: films
                }

                this.$store.dispatch('newRent', newRent)
                    .then(() => {
                        localStorage.removeItem("customerId")
                        localStorage.removeItem("document")
                        localStorage.removeItem("filmsRented")

                        this.flash('Aluguel realizado com sucesso! Você receberá um e-mail de confirmação', 'success', {
                            timeout: 5000
                        })

                        this.$router.push('/')
                        location.reload()
                    })
                    .catch(error => {
                        localStorage.error = error.response.data.start_date

                        this.flash('Erro ao realizar o aluguel, tente mais tarde!' + start_date_string, 'error', {
                            timeout: 3000
                        })
                    })
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
            this.$store.dispatch('getRentsByCustomerId', localStorage.customerId)
            localStorage.document = this.$route.params.document
        }
    }
</script>