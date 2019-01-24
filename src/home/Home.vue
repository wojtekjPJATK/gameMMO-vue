<template>
  <v-layout align-center column class="my-4">
    <h1 class="display-2" my-2>Witamy w Wasteland Domination</h1>
    <v-flex xs6 my-2>
      <v-card width="800px">
        <v-layout>
          <v-flex xs12 pa-4>
            <p
              class="subheading"
            >Lądujesz na świecie w którym nastąpiła katastrofa nuklearna. Twoim zadaniem jest przetrwanie, ale strzeż się innych graczy! Świat jest spustoszony, ilości surowców ograniczone, a wrogowie zaciekli. Przetrwaj i zdominuj świat!</p>
            <v-img
              mb-2
              max-height="300px"
              src="https://storage.googleapis.com/arc-mmo-game/waste.jpg"
            ></v-img>
            <v-flex xs12 mt-3>
              <p class="subheading" pt-2>
                Świat składa się z pól które możesz przejmować. Zwiększą one Twoje wydobycie surowców. Uważaj, bo inni będą o nie walczyć!
                Gromadź surowce i ulepszaj swoje budynki! Rozszerzaj swoje terytorium i pokonaj swoich wrogów!
                Czy zdołasz zdominować ten świat?
              </p>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-card>

      <v-flex xs3></v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("getSession");
  }
};
</script>
