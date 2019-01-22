<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-dialog v-model="dialog" persistent max-width="400px">
        <v-card>
          <v-card-title>
            <span class="headline">Attack</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <h1>How many bullets would you like to use for the attack?</h1>
                  <v-text-field label="Bullets" required v-model="bullets" mask="#######"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>{{ attackError }}</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="attack()">Attack</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-flex xs6 offset-xs3>
        <v-layout row wrap>
          <v-flex xs12>
            <v-layout row wrap>
              <v-icon large @click="$router.go(-1)">fas fa-chevron-left</v-icon>
              <h2>Back to World List</h2>
            </v-layout>
          </v-flex>
          <v-flex v-for="tile in this.map" style="width: 20%" :key="tile.num">
            <v-card
              v-if="myTile(tile)"
              height="150px"
              width="100%"
              color="amber"
              @click="tileAction(tile)"
            >
              <v-layout justify-center align-center>
                <v-icon v-if="myCity(tile)" size="150px" color="black">fas fa-ring</v-icon>
              </v-layout>
            </v-card>
            <v-card
              v-else-if="tile.status == 'free'"
              height="150px"
              width="100%"
              color="green"
              @click="tileAction(tile)"
            ></v-card>
            <v-card v-else height="150px" width="100%" color="red" @click="tileAction(tile)">
              <v-icon v-if="tile.status == 'City'" size="150px" color="black">fas fa-ring</v-icon>
            </v-card>
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
      bunkerID: null,
      dialog: false,
      bullets: "",
      attackError: ""
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
      if (!this.bunkerID) return;
      if (this.myCity(tile)) {
        this.$router.push({
          name: "base",
          params: { id: this.id.toString() }
        });
      } else {
        this.dialog = true;
        this.currentTile = tile;
      }
    },
    myCity(tile) {
      return tile.owner == this.bunkerID && tile.status == "City";
    },
    myTile(tile) {
      return tile.owner == this.bunkerID;
    },
    attack() {
      this.$store
        .dispatch("attack", {
          playerid: this.bunkerID,
          squareid: this.currentTile.id,
          bullets: this.bullets
        })
        .then(result => {
          console.log(result);
          this.dialog = false;
        })
        .catch(err => {
          this.attackError =
            err.response.data.msg +
            ". You have only " +
            err.response.data.bullets;
          console.log(err);
        });
    }
  }
};
</script>

