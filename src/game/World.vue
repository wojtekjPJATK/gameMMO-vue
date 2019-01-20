<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-flex xs2 offset-xs2>
        <v-card height="50px">
          <v-card-title>
            <span class="headline">World list:</span>
          </v-card-title>
        </v-card>
        <v-list>
          <v-list-tile v-for="world in worlds" :key="world.id" @click="displayWorld(world.id)">
            <v-list-tile-title v-text="world.name"></v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-avatar>
              <v-icon @click="createWorld()">fas fa-plus</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-title>
              <v-text-field height="20px" v-model="name" placeholder="Name"></v-text-field>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
        <p class="red--text">{{ error }}</p>
      </v-flex>
      <v-flex xs5>
        <v-layout row wrap>
          <v-dialog
            v-model="load"
            persistent
            width="100px"
            light
            class="center"
            style="background: black"
          >
            <v-progress-circular :size="70" :width="7" color="white" indeterminate></v-progress-circular>
          </v-dialog>
          <v-flex v-for="tile in map" style="width: 20%" :key="tile.num">
            <v-card
              v-if="tile.status != 'free'"
              height="155px"
              width="155px"
              color="black"
              @click="tileAction(tile)"
            >
              <v-layout justify-center align-center>
                <v-icon v-if="tile.status == 'City'" size="120px" color="grey">fas fa-ring</v-icon>
              </v-layout>
            </v-card>
            <v-card v-else height="155px" width="155px" color="black" @click="tileAction(tile)"></v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      load: true,
      name: "",
      error: ""
    };
  },
  mounted() {
    this.$store
      .dispatch("getWorldList")
      .then(result => {
        let id = result[0].id;
        return this.$store.dispatch("getWorld", id);
      })
      .then(result => {
        this.map = result.data.World.map;
        this.load = false;
      })
      .catch(err => {});
  },
  computed: {
    worlds() {
      return this.$store.getters.getWorlds;
    },
    map() {
      return this.$store.getters.getWorld;
    }
  },
  methods: {
    displayWorld(id) {
      this.load = true;
      this.$store
        .dispatch("getWorld", id)
        .then(result => {
          this.load = false;
        })
        .catch(err => {
          this.error = err.response.data;
        });
    },
    tileAction(tile) {
      console.log(tile);
    },
    createWorld() {
      this.$store
        .dispatch("createWorld", this.name)
        .then(result => {
          this.name = "";
        })
        .catch(err => {
          this.error = err.response.data.msg;
        });
    }
  },
  watch: {
    loading(load) {
      if (!load) return;
    }
  }
};
</script>

<style lang="stylus" scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
