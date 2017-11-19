<template lang="html">
  <div class="">
    <app-new-card-modal v-if="showNewCard"
      @please-close="showNewCard = false"
      :parent="card">
    </app-new-card-modal>

    <div class="w3-card-2 w3-padding w3-round">
      <div class="w3-row">
        <b>{{ card.title }}</b>
        <p>{{ card.content }}</p>
      </div>
      <div class="w3-row">
        <button type="button" name="button">showSubcards</button>
      </div>
      <div @click="showNewSubCard(card)" class="w3-row">
        <button class="w3-button w3-blue" type="button" name="button">New subcard</button>
      </div>

      <div v-for="subCard in subCards" class="">
        <app-card :card="subCard"></app-card>
      </div>
    </div>


  </div>
</template>

<script>
import { send } from '../hc.js'
import NewCardModal from './NewCardModal.vue'

export default {
  name: "app-card",
  components: {
    'app-new-card-modal': NewCardModal
  },
  props: {
    card: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      showNewCard: false,
      subCards: []
    }
  },
  methods: {
    showNewSubCard () {
      this.showNewCard = true
    },
    updateSubCards() {
      send("cardGetLinks", this.card.hash, (data) => {
        data.forEach((element) => {
          if (element.type === 'CHILD_OF') {
            var cardHash = element.card;
            send("cardRead", cardHash, (card) => {
              console.log("card: "+ card);
              card.hash = cardHash;
              this.subCards.push(card);
            })
          }
        })
      })
    }
  },
  created () {
    this.updateSubCards();
  }

}
</script>

<style lang="css">
</style>
