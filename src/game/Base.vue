<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
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
            :disabled="loading"
            color="grey"
            class="white--text"
            @click="upgrade(building)"
          >Upgrade
            <v-icon right dark>fas fa-angle-double-up</v-icon>
          </v-btn>
        </div>
      </v-flex>
      {{ actionStatus }}
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
      loading: false,
      actionStatus: "",
      buildings: [
        {
          name: "Armory",
          url: "https://storage.googleapis.com/arc-mmo-game/buildings/ammo.png",
          level: ""
        },
        {
          name: "Bank",
          url: "https://storage.googleapis.com/arc-mmo-game/buildings/bank.png",
          level: ""
        },
        {
          name: "Bunker",
          url:
            "https://storage.googleapis.com/arc-mmo-game/buildings/bunkier.png",
          level: ""
        },
        {
          name: "Pantry",
          url:
            "https://storage.googleapis.com/arc-mmo-game/buildings/pantry.png",
          level: ""
        },
        {
          name: "Lumber Mill",
          url:
            "https://storage.googleapis.com/arc-mmo-game/buildings/tartak.png",
          level: ""
        }
      ],
      resources: [
        {
          name: "Wood",
          url:
            "https://storage.googleapis.com/arc-mmo-game/resources/deski.png",
          amount: ""
        },
        {
          name: "Caps",
          url:
            "https://storage.googleapis.com/arc-mmo-game/resources/kapsle.png",
          amount: ""
        },
        {
          name: "Ammo",
          url:
            "https://storage.googleapis.com/arc-mmo-game/resources/naboje.png",
          amount: ""
        },
        {
          name: "Berries",
          url:
            "https://storage.googleapis.com/arc-mmo-game/resources/zmutowanejagody.png",
          amount: ""
        },
        {
          name: "Action Points",
          url:
            "https://storage.googleapis.com/arc-mmo-game/resources/actions.png",
          amount: ""
        }
      ]
    };
  },
  mounted() {
    return this.$store
      .dispatch("getPlayer", this.id)
      .then(result => {
        this.buildings[0].level = result.data.player.sklad;
        this.buildings[1].level = result.data.player.sejf;
        this.buildings[2].level = result.data.player.bunkier;
        this.buildings[3].level = result.data.player.spizarnia;
        this.buildings[4].level = result.data.player.tartak;

        this.buildings[0].id = result.data.player.skladId;
        this.buildings[1].id = result.data.player.sejfId;
        this.buildings[2].id = result.data.player.bunkierId;
        this.buildings[3].id = result.data.player.spizarniaId;
        this.buildings[4].id = result.data.player.tartakId;

        this.resources[0].amount = result.data.player.deski;
        this.resources[1].amount = result.data.player.kapsle;
        this.resources[2].amount = result.data.player.naboje;
        this.resources[3].amount = result.data.player.jagody;
        this.resources[4].amount = result.data.player.actionPoints;

        this.playerID = result.data.player.id;
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
          console.log(result);
          console.log("ok");
          this.loading = false;
        })
        .catch(err => {
          this.actionStatus = err.response.data.fail;
          this.loading = false;
        });
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
</style>
