<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-flex xs6 offset-xs3>
        <v-layout row wrap>
          <v-flex xs12>
            <v-layout row wrap>
              <v-icon large @click="$router.go(-1)">fas fa-chevron-left</v-icon>
              <h2>Back to World List</h2>
            </v-layout>
          </v-flex>
          <v-flex v-for="tile in this.map" style="width: 20%" :key="tile.num">
            <v-card v-if="tile.status != 'free'" color="grey" @click="tileAction(tile)">
              <v-layout justify-center align-center>
                <v-icon v-if="myCity(tile)" size="150px" color="amber">fas fa-ring</v-icon>
                <v-icon v-else size="150px" color="white">fas fa-ring</v-icon>
              </v-layout>
            </v-card>
            <v-card v-else height="150px" width="100%" color="grey" @click="tileAction(tile)"></v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      load: true,
      name: "",
      error: "",
      base: "",
      join: false,
      bunkerID: null
    };
  },
  mounted() {
    this.$store
      .dispatch("getWorld", this.id)
      .then(result => {
        this.bunkerID = result.data.playerId;
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    map() {
      return this.$store.getters.getWorld;
    }
  },
  methods: {
    tileAction(tile) {
      console.log(tile);
      if (this.myCity(tile)) {
        this.$router.push({
          name: "base",
          params: { id: this.id.toString() }
        });
      } else {
        this.$store.dispatch("attack", {
          playerid: this.bunkerID,
          squareid: tile.id,
          bullets: 10
        });
        // attack
      }
    },
    myCity(tile) {
      return tile.owner == this.bunkerID && tile.status == "City";
    }
  }
};
</script>

