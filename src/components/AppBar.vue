<template>
  <div>
    <v-app-bar app color="deep-purple accent-4" dark>
        <v-icon>mdi-arrow-top-left-bold-outline</v-icon>
        <v-toolbar-title>Vuetify Scraper</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text><router-link to="/">Home</router-link></v-btn>
        <v-btn text><router-link to="/about">About</router-link></v-btn>
        <v-btn text><router-link to="/nfl/year">NFL</router-link></v-btn> 
        <v-btn text><router-link to="/nba/year">NBA</router-link></v-btn> 
        <v-btn text><router-link to="/nhl/year">NHL</router-link> </v-btn> 
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on"> Dropdown </v-btn>
            </template>
            <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" },
    ],
    offset: true,
  }),
};
</script>

<style>
</style>