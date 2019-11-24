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
                        <form autocomplete="off" @submit.prevent="validar">
                            <v-text-field
                                    v-model="document"
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
    export default {}
</script>

<style>
    .card-principal {
        padding: 2%;
    }
</style>