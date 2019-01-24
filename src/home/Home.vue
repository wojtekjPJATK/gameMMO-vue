<template>
  <v-layout align-center column class="mx-4">
    <h1>Home Page Title</h1>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, id praesentium. Aut, excepturi quam nihil beatae error exercitationem tempore in?</p>
  </v-layout>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("getSession");
  }
};
</script>
