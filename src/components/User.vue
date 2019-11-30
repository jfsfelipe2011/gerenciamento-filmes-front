<template>
    <v-container>
        <v-layout class="justify-center">
            <v-flex xs10>
                <v-container fluid>
                    <v-card
                            max-width="800"
                            height="600"
                            class="mx-auto card-principal"
                    >
                        <div class="flash"> 
                            <flash-message></flash-message>
                        </div>

                        <form autocomplete="off" @submit.prevent="validar">
                            <v-text-field
                                    v-model="customer.document"
                                    label="Documento"
                                    placeholder="Digite seu documento"
                                    required
                            ></v-text-field>

                            <v-btn type="submit" class="ma-2" color="primary" dark>Enviar
                                <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
                            </v-btn>
                        </form>
                    </v-card>
                </v-container>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios'

    export default {
        data: () => ({
            customer: {}
        }),

        methods: {
            validar: function() {
                if (localStorage.filmsRented === undefined) {
                    this.flash('Nenhum filme selecionado para aluguel!', 'error', {
                        timeout: 3000
                    })

                    this.$router.push('/')
                }

                let document = "" + this.customer.document.replace(/[^0-9]/g,'');

                if (document.length !== 11) {
                    this.flash('Documento inválido!', 'error', {
                        timeout: 3000
                    })

                    return
                }

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
                    localStorage.teste = response.data.name
                }).catch(error => {
                    localStorage.error = error

                    this.$router.push('/user/create/' + document)
                })
            }
        }
    }
</script>

<style>
    .card-principal {
        padding: 2%;
    }

    .flash {
        width: 90%;
        margin: auto;
        text-align: center;
        padding-bottom: 2%;
    }
</style>