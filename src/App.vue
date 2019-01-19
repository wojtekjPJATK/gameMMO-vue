<template>
  <v-app dark>
    <Navbar/>
    <v-content class="ma-3">
      <router-view></router-view>
    </v-content>
    <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>Grupa 4 &copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from "@/navbar/Navbar";
export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>