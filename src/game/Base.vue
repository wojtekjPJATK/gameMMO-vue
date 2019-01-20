<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex xs12>
        <v-layout row wrap>
          <v-icon large @click="$router.go(-1)">fas fa-chevron-left</v-icon>
          <h2 ml-2>Back to world map</h2>
        </v-layout>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex v-for="resource in this.resources" :key="resource.name" xs3>
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
            @click="upgrade(building.name)"
          >Upgrade
            <v-icon right dark>fas fa-angle-double-up</v-icon>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
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
          amount: "1"
        },
        {
          name: "Caps",
          url:
            "https://storage.googleapis.com/arc-mmo-game/resources/kapsle.png",
          amount: "1"
        },
        {
          name: "Ammo",
          url:
            "https://storage.googleapis.com/arc-mmo-game/resources/naboje.png",
          amount: "1"
        },
        {
          name: "Berries",
          url:
            "https://storage.googleapis.com/arc-mmo-game/resources/zmutowanejagody.png",
          amount: "1"
        }
      ]
    };
  },
  methods: {
    upgrade(name) {
      console.log("upgrade " + name);
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
