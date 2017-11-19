<template>
  <div id="app">
    <h1 class="w3-center">Fractal Wiki</h1>

    <div class="w3-row">
      <button @click="showNewCard = true" class="w3-button w3-blue" type="button" name="button">new root card</button>
    </div>

    <app-new-card-modal v-if="showNewCard"
      @please-close="showNewCard = false"
      @card-created="updateMyCards()"
      :parent="null">
    </app-new-card-modal>

    <div class="w3-container">
      <h4>My cards</h4>
      <div class="w3-row-padding">
        <div v-for="card in myCards" class="">
          <app-card :card="card"></app-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { send } from './hc.js'
import NewCardModal from './components/NewCardModal.vue'
import Card from './components/Card.vue'

export default {
  name: 'app',
  components: {
    'app-new-card-modal': NewCardModal,
    'app-card': Card
  },
  data () {
    return {
      showNewCard: false,
      myCards: []
    }
  },
  methods: {
    updateMyCards () {
      this.myCards = [];
      console.log("getting my cards");
      send("cardGetMyFavorites", {}, (data) => {
        console.log("data: "+ data);
        console.dir(data);
        console.log(data.length);
        data.forEach((cardHash) => {
          send("cardRead", cardHash, (card) => {
            console.log("card: "+ card);
            card.hash = cardHash;
            this.myCards.push(card);
          })
        })
      })
    }
  },
  created () {
    this.updateMyCards();
  }
}
</script>

<style>

.w3-modal {
  display: block;
}

</style>
