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
              <v-text-field v-model="name" placeholder="Name"></v-text-field>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-btn v-if="join" round large @click="joinWorld(world_id)">Join this world</v-btn>
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
          <v-flex v-for="tile in this.map" style="width: 20%" :key="tile.num">
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
      error: "",
      player_id: "",
      base: "",
      join: false,
      world_id: "sdf"
    };
  },
  mounted() {
    let id;
    this.$store
      .dispatch("getWorldList")
      .then(result => {
        id = result[0].id;
        return this.$store.dispatch("getWorld", id);
      })
      .then(result => {
        this.world_id = result.data.World.id;
        this.map = result.data.World.map;
        this.load = false;
        return this.$store.dispatch("getPlayer", id);
      })
      .then(result => {
        this.base = result.data.player;
        if (result) this.player_id = result.data.player.id;
        this.join = false;
      })
      .catch(err => {
        if (err.response.status == 406) this.join = true;
        else this.error = err.response.data;
      });
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
          this.world_id = result.data.World.id;
          return this.$store.dispatch("getPlayer", id);
        })
        .then(result => {
          this.player_id = result.data.player.id;
          this.base = result.data.player;
          this.join = false;
        })
        .catch(err => {
          if (err.response.status == 406) this.join = true;
          else this.error = err.response.data;
        });
    },
    tileAction(tile) {
      if (tile.status == "free") {
        // free spot
      } else if (tile.status == "City") {
        if (tile.owner == this.player_id) {
          this.$router.push({ name: "base", params: { base: this.base } });
        } else {
          // attack
        }
      } else {
        // occupied
      }
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
    },
    joinWorld(id) {
      this.$store
        .dispatch("joinWorld", id)
        .then(result => {
          this.base = result.newPlayer;
        })
        .catch(err => {});
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
