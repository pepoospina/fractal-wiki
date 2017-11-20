<template lang="html">
  <div class="">

    <transition name="slide-down-up">
      <app-new-card-modal v-if="showNewCardModal"
        @please-close="showNewCardModal = false"
        @card-created="$emit('card-created')"
        :parent="card">
      </app-new-card-modal>
    </transition>

    <div class="w3-card-4">
      <div class="w3-row w3-container">
        <h4>{{ card.title }}</h4>
        <p class="w3-left">{{ card.content }}</p>
      </div>
      <div v-if="subcardsShown" class="w3-row">
        <button @click="toggleSubcards()"
          class="w3-button show-subcards-btn" type="button" name="button">
          {{ subcardsShown ? 'hide' : 'show' }} subcards
        </button>
      </div>
      <div class="slider-container w3-container">
        <transition name="slide-down-up">
          <div v-if="subcardsShown" class="w3-row subcards-container">
            <div v-if="subcards.length > 0" >
              <div v-for="subcard in subcards" class="">
                <app-card @card-created="$emit('card-created')" :card="subcard"></app-card>
              </div>
            </div>
            <div v-else class="">
              <i>no subcards</i>
            </div>
            <button @click="showNewCardModal = true"
              class="w3-button w3-border w3-round-large w3-margin-top">
              <i class="fa fa-plus" aria-hidden="true"></i> <span class="w3-margin-left">new subcard</span>
            </button>
          </div>
        </transition>
      </div>

      <div class="w3-row">
        <button @click="toggleSubcards()"
          class="w3-button show-subcards-btn show-subcards-btn-bottom" type="button" name="button">
          {{ subcardsShown ? 'hide' : 'show' }} subcards
        </button>
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
    },
    expanded: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showNewCardModal: false,
      subcards: [],
      subcardsShown: false
    }
  },
  methods: {
    showNewSubCard () {
      this.showNewCardModal = true
    },
    toggleSubcards () {
      this.subcardsShown = !this.subcardsShown
    },
    updateSubCards() {
      send("cardGetLinks", this.card.hash, (data) => {
        data.forEach((element) => {
          if (element.type === 'CHILD_OF') {
            var cardHash = element.card;
            send("cardRead", cardHash, (card) => {
              console.log("card: "+ card);
              card.hash = cardHash;
              this.subcards.push(card);
            })
          }
        })
      })
    }
  },
  created () {
    this.subcardsShown = this.expanded
    this.updateSubCards()
  }

}
</script>

<style scoped>

.w3-card-4 {
  border-radius: 16px;
}

.show-subcards-btn {
  width: 100%;
  background-color: #d6d6d6;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 12px;
}

.show-subcards-btn-bottom {
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}

.subcards-container {
  padding-top: 20px;
  padding-bottom: 20px;
}

</style>
