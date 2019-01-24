<template>
  <v-container>
    <v-layout>
      <v-flex xs8 offset-xs2>
        <v-toolbar flat>
          <v-toolbar-title>World List:</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-btn slot="activator" class="mb-2" round color="grey">New World</v-btn>
            <v-card>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="name" label="World name"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click="save">Add</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-data-table :items="worlds" class="elevation-1" hide-actions :headers="headers">
          <template slot="items" slot-scope="props">
            <td class="text-lg-center">{{ props.item.name }}</td>
            <td class="text-lg-center">{{ props.item.created}}</td>
            <td class="text-lg-center">{{ props.item.players}}/{{props.item.capacity}}</td>
            <td>
              <v-btn @click="join(props.item.id)">JOIN</v-btn>
              <v-btn @click="map(props.item.id)">MAP</v-btn>
            </td>
          </template>
        </v-data-table>
        <p class="red--text">{{ this.status }}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    name: "",
    status: "",
    headers: [
      {
        text: "Name",
        sortable: true,
        value: "name"
      },
      {
        text: "Created",
        sortable: true,
        value: "created"
      },
      {
        text: "Players",
        sortable: false,
        value: "name"
      }
    ]
  }),

  mounted() {
    this.$store
      .dispatch("getWorldList")
      .then(result => {})
      .catch(err => {});
  },

  computed: {
    worlds() {
      return this.$store.getters.getWorlds;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    close() {
      this.dialog = false;
    },

    save() {
      if (this.name == "") return;
      this.$store
        .dispatch("createWorld", this.name)
        .then(result => {
          this.name = "";
        })
        .catch(err => {
          this.status = err.response.data.msg;
        });
      this.close();
    },

    join(worldID) {
      this.$store
        .dispatch("joinWorld", worldID)
        .then(result => {
          this.$router.push({
            name: "map",
            params: { id: worldID.toString() }
          });
        })
        .catch(err => {
          this.status = err.response.data.msg;
        });
    },

    map(worldID) {
      this.$router.push({ name: "map", params: { id: worldID.toString() } });
    }
  }
};
</script>