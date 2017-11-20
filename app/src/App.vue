<template>
  <div class="w3-container w3-center" id="app">
    <h1 class="w3-center">Fractal Wiki</h1>

    <transition name="slide-down-up">
      <app-new-card-modal v-if="showNewCard"
        @please-close="showNewCard = false"
        @card-created="updateMyCards()"
        :parent="null">
      </app-new-card-modal>
    </transition>

    <hr>

    <div class="w3-container">
      <h2>My cards</h2>
      <div class="w3-row-padding">
        <div v-for="card in myCards" class="card-container w3-col m4">
          <app-card
            @card-created="updateMyCards()"
            :card="card"
            :expanded="true">
          </app-card>
        </div>
        <div v-if="myCards.length == 0" class="">
          <i>no cards found - start by creating one</i>
        </div>
        <div class="w3-col m4">
          <button @click="showNewCard = true"
            class="new-card-btn w3-button w3-blue" type="button" name="button">new root card</button>
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
      send("cardGetMyFavorites", {}, (data) => {
        data.forEach((cardHash) => {
          send("cardRead", cardHash, (card) => {
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

@import './simpleEffects.css';

.w3-modal {
  display: block;
}

.w3-modal-content, .w3-modal-content .w3-card-4  {
  border-radius: 20px;
}

.w3-modal-content .w3-card-4 {
  padding-top: 20px;
  padding-bottom: 30px;
}

.card-container {
  margin-bottom: 26px;
}

.new-card-btn {
  width: 100%;
  border-radius: 16px;
}

</style>
