<template>
    <v-container>
        <v-layout class="justify-center">
            <v-flex xs10>
                <v-container fluid>
                    <v-card
                            max-width="800"
                            height="700"
                            class="mx-auto card-principal"
                    >

                        <div class="flash">
                            <flash-message></flash-message>
                        </div>

                        <form autocomplete="off" @submit.prevent="cadastrar">
                            <v-text-field
                                    v-model="customer.name"
                                    label="Nome"
                                    placeholder="Digite seu nome"
                                    required
                            ></v-text-field>

                            <v-text-field
                                    v-model="customer.cep"
                                    @focusout="getAddress"
                                    @focusin="removeAddress"
                                    label="Cep"
                                    placeholder="Digite seu CEP"
                                    required
                            ></v-text-field>

                            <div v-if="inputAddress">
                                <v-text-field
                                        v-model="address.street"
                                        label="Rua"
                                        readonly="readonly"
                                        required
                                ></v-text-field>

                                <v-text-field
                                        v-model="address.number"
                                        label="Número"
                                        placeholder="Digite o número"
                                        required
                                ></v-text-field>

                                <v-text-field
                                        v-model="address.neighborhood"
                                        label="Bairro"
                                        readonly="readonly"
                                        required
                                ></v-text-field>

                                <v-text-field
                                        v-model="address.city"
                                        label="Cidade"
                                        readonly="readonly"
                                        required
                                ></v-text-field>

                                <v-text-field
                                        v-model="address.state"
                                        label="País"
                                        readonly="readonly"
                                        required
                                ></v-text-field>
                            </div>

                            <v-btn type="submit" class="ma-2" color="primary" dark>Cadastrar
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
            customer: {},
            inputAddress: false,
            address: {}
        }),

        methods: {
            getAddress: function () {
                let cep = parseInt(this.customer.cep.replace(/[^0-9]/g,''));

                axios(
                    {
                        method: "GET",
                        "url": "https://viacep.com.br/ws/" + cep + "/json",
                    }
                ).then(response => {
                    this.address = {
                        street: response.data.logradouro,
                        neighborhood: response.data.bairro,
                        city: response.data.localidade,
                        state: response.data.uf
                    }

                    this.inputAddress = true
                }).catch(error => {
                    this.inputAddress = false
                    this.address      = {}

                    this.flash('Cep inválido!', 'error', {
                        timeout: 3000
                    })

                    localStorage.error = error
                })
            },
            removeAddress: function () {
                this.inputAddress = false
                this.address      = {}
            },
            cadastrar: function () {
                let address = this.address.street + ", " + this.address.number + " - " + this.customer.cep + " - "
                + this.address.neighborhood + " / " + this.address.city + " " + this.address.state

                let newCustomer = {
                    name: this.customer.name,
                    address: address,
                    document: this.$route.params.document,
                    payment: 'credit-card'
                }

                localStorage.document = newCustomer.document

                this.$store.dispatch('newCustomer', newCustomer)
                    .then((response) => {
                        this.flash('Cadastrado com sucesso!', 'success', {
                            timeout: 3000
                        })

                        this.$router.push('/cart/' + response.data.document)
                    })
                    .catch(error => {
                        localStorage.error = error.response.data.document

                        this.flash('Erro ao cadastrar novo usuário, tente mais tarde!', 'error', {
                            timeout: 3000
                        })
                    })
            }
        }
    }
</script>
