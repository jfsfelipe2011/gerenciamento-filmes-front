<template>
  <v-app id="inspire">
    <v-navigation-drawer
            v-model="drawer"
            app
            clipped
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
              <router-link to="/" tag="li">Home</router-link>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-for="(category, index) in categories" :key="index" link>
          <v-list-item-action>
            <v-icon>mdi-filmstrip</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <router-link :to="'/films/' + category.id" tag="li">{{ category.name }}</router-link>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
            app
            clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Gerenciamento de Filmes</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },

    data: () => ({
      drawer: null,
    }),

    computed: {
      categories () {
        return this.$store.state.category.categoryList
      }
    },

    created () {
      this.$vuetify.theme.dark = true
      this.$store.dispatch('getCategories')
    },
  }
</script>
