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
    export default {
        data: () => ({
            customer: {}
        }),

        methods: {
            validar: function() {
                let document = "" + this.customer.document

                if (document.length !== 11) {
                    this.flash('Documento inválido!', 'error', {
                        timeout: 2000
                    })

                    return
                }
                

                if (!Number.isInteger(parseInt(this.customer.document))) {
                    this.flash('Documento deve ser numérico!! ', 'error', {
                        timeout: 2000
                    })

                    return
                }

                this.flash('Documento: ' + this.customer.document, 'success', {
                    timeout: 2000
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