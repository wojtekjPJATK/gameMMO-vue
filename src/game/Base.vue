<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-dialog v-model="loading" hide-overlay persistent width="100" class="center">
        <v-card color="black" width="100" height="100">
          <v-layout justify-center align-center>
            <div class="loader">
              <v-progress-circular :size="70" :width="7" color="white" indeterminate></v-progress-circular>
            </div>
          </v-layout>
        </v-card>
      </v-dialog>
      <v-flex xs12>
        <v-layout row wrap>
          <v-icon large @click="$router.go(-1)">fas fa-chevron-left</v-icon>
          <h2 ml-2>Back to world map</h2>
        </v-layout>
      </v-flex>
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

      <v-flex v-for="building in this.buildings" :key="building.name">
        <v-img class="building" :src="building.url"></v-img>
        <h2>{{ building.name }}</h2>
        <span>LVL: {{ building.level}}</span>
        <div>
          <v-btn
            :loading="loading"
            :disabled="disabled(building)"
            color="grey"
            class="white--text"
            @click="upgrade(building)"
          >Upgrade
            <v-icon right dark>fas fa-angle-double-up</v-icon>
          </v-btn>
        </div>
        <h4>Upgrade cost:</h4>
        <small>{{ building.upgrade.wood }} wood, {{building.upgrade.caps }} caps and {{ building.upgrade.points}} action points</small>
      </v-flex>
      <v-flex xs12>
        <p v-bind:style="{color: statusColor}">{{ actionStatus }}</p>
        <h1>Actions made this turn:</h1>
        <div v-for="action in this.raports" :key="action.id">{{ action }}</div>
        {{ this.fights }}
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import bunkerJSON from "./bunker.js";

export default {
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      actionStatus: "",
      statusColor: "green",
      raports: [],
      fights: "",
      buildings: bunkerJSON.buildings,
      resources: bunkerJSON.resources
    };
  },
  mounted() {
    this.loading = true;
    return this.$store
      .dispatch("getPlayer", this.id)
      .then(result => {
        this.updateBunker(result.data);
        this.playerID = result.data.player.id;
        return this.$store.dispatch("getRaport", this.id);
      })
      .then(result => {
        this.raports = result.data.pendingRaports;
        if (result.data.toRaports.length)
          this.fights = "<h2>Battle report: </h2>" + result.data.toRaports;
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    upgrade(building) {
      this.loading = true;
      this.$store
        .dispatch("upgradeBuilding", {
          building: building,
          player: this.playerID
        })
        .then(result => {
          this.updateBunker(result.data);
          this.loading = false;
          this.statusColor = "green";
          this.actionStatus = building.name + " will be upgraded next turn!";
        })
        .catch(err => {
          console.log(err);
          this.statusColor = "red";
          this.actionStatus = "Not enough resources!";
          this.loading = false;
        });
    },

    disabled(building) {
      if (building.upgrade.caps > this.resources[1].amount) return true;
      if (building.upgrade.wood > this.resources[0].amount) return true;
      if (building.upgrade.points > this.resources[4].amount) return true;
      return false;
    },

    updateBunker(data) {
      this.loading = true;

      this.buildings[0].level = data.player.sklad;
      this.buildings[1].level = data.player.sejf;
      this.buildings[2].level = data.player.bunkier;
      this.buildings[3].level = data.player.spizarnia;
      this.buildings[4].level = data.player.tartak;

      this.buildings[0].id = data.player.skladId;
      this.buildings[1].id = data.player.sejfId;
      this.buildings[2].id = data.player.bunkierId;
      this.buildings[3].id = data.player.spizarniaId;
      this.buildings[4].id = data.player.tartakId;

      if (data.buildings) {
        this.buildings[0].income = data.buildings.armory.income;
        this.buildings[1].income = data.buildings.bank.income;
        this.buildings[2].income = data.buildings.bunker.income;
        this.buildings[3].income = data.buildings.pantry.income;
        this.buildings[4].income = data.buildings.lumberMill.income;

        this.buildings[0].upgrade.caps = data.buildings.armory.capsCost;
        this.buildings[0].upgrade.wood = data.buildings.armory.woodCost;
        this.buildings[0].upgrade.points = data.buildings.armory.pointsCost;

        this.buildings[1].upgrade.caps = data.buildings.bank.capsCost;
        this.buildings[1].upgrade.wood = data.buildings.bank.woodCost;
        this.buildings[1].upgrade.points = data.buildings.bank.pointsCost;

        this.buildings[2].upgrade.caps = data.buildings.bunker.capsCost;
        this.buildings[2].upgrade.wood = data.buildings.bunker.woodCost;
        this.buildings[2].upgrade.points = data.buildings.bunker.pointsCost;

        this.buildings[3].upgrade.caps = data.buildings.pantry.capsCost;
        this.buildings[3].upgrade.wood = data.buildings.pantry.woodCost;
        this.buildings[3].upgrade.points = data.buildings.pantry.pointsCost;

        this.buildings[4].upgrade.caps = data.buildings.lumberMill.capsCost;
        this.buildings[4].upgrade.wood = data.buildings.lumberMill.woodCost;
        this.buildings[4].upgrade.points = data.buildings.lumberMill.pointsCost;
      }

      this.resources[0].amount = data.player.deski;
      this.resources[1].amount = data.player.kapsle;
      this.resources[2].amount = data.player.naboje;
      this.resources[3].amount = data.player.jagody;
      this.resources[4].amount = data.player.actionPoints;

      this.loading = false;
    }
  }
};
</script>

<style scoped>
.building {
  width: 200px;
  height: 200px;
  padding: 10px;
  margin: 10px;
}

.resource {
  width: 35px;
  height: 35px;
  margin-left: 5px;
}

.loader {
  margin-top: 15px;
}
</style>
