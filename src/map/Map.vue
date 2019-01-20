<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-flex xs6 offset-xs3>
        <v-layout row wrap>
          <v-flex xs12>
            <v-layout row wrap>
              <v-icon large @click="$router.go(-1)">fas fa-chevron-left</v-icon>
              <h2 ml-2>Back to World List</h2>
            </v-layout>
          </v-flex>
          <v-flex v-for="tile in this.map" style="width: 20%" :key="tile.num" my-3>
            <v-card
              v-if="tile.status != 'free'"
              height="120px"
              width="150px"
              color="grey"
              @click="tileAction(tile)"
            >
              <v-layout justify-center align-center>
                <v-icon v-if="tile.status == 'City'" size="120px" color="white">fas fa-ring</v-icon>
              </v-layout>
            </v-card>
            <v-card v-else height="120px" width="150px" color="grey" @click="tileAction(tile)"></v-card>
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
      player_id: "",
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
      if (tile.status == "free") {
        // free spot
      } else if (tile.status == "City") {
        if (tile.owner == this.bunkerID) {
          this.$router.push({ name: "base", params: { base: this.bunkerID } });
        } else {
          console.log("not yours");
          // attack
        }
      } else {
        // occupied
      }
    }
  }
};
</script>

