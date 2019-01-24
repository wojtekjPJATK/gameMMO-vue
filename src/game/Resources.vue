<template>
  <v-container>
    <v-layout>
      <v-flex v-for="resource in this.resources" :key="resource.name" xs2>
        <v-card>
          <v-layout align-center justify-center row fill-height>
            <v-flex xs4>
              <v-img class="resource" :src="resource.url"></v-img>
            </v-flex>
            <v-flex xs4>
              <span>{{resource.name}}</span>
            </v-flex>
            <v-flex xs4>
              <span>{{resource.amount}}</span>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs2></v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    resources() {
      return this.$store.getters.getResources;
    }
  }
};
</script>

<style scoped>
.resource {
  width: 35px;
  height: 35px;
  margin-left: 5px;
}
</style>
