<template>
  <v-card
    max-width="800"
    class="mx-auto card-principal"
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>{{ film.name }}</v-list-item-title>
        <v-list-item-subtitle>Categoria: {{ film.category.name }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-row
      no-gutters
    >
        <v-col
            :cols=4
        >
            <v-img
                :src="urlBase + film.image"
                width="200"
                height="300"
            ></v-img>
        </v-col>

        <v-col
            :cols=8
        >
            {{ film.description }}
        </v-col>
    </v-row>

    <v-card-text>
      Duração: {{ film.duration }} min
    </v-card-text>
    <v-card-text>
      Lançamento: {{ film.release_date }}
    </v-card-text>
    <v-card-text>
      Elenco:

        <v-simple-table dark>
            <template v-slot:default>
            <tbody>
                <tr v-for="actor in film.actors" :key="actor.id">
                    <td>{{ actor.name }}</td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
    </v-card-text>

    <v-card-text>
      Diretore(s):

        <v-simple-table dark>
            <template v-slot:default>
            <tbody>
                <tr v-for="director in film.directors" :key="director.id">
                    <td>{{ director.name }}</td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
    export default {
        data: () => ({
            urlBase: process.env.VUE_APP_STORAGE
        }),

        computed: {
            film () {
                return this.$store.state.film.filmView
            }
        },

        created() {
            this.$store.dispatch('getFilmById', this.$route.params.filmId)
        }
    }
</script>

<style>
    .card-principal {
        padding: 2%;
    }
</style>
