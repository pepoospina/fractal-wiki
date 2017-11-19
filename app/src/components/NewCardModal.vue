<template lang="html">
  <div class="w3-modal">
    <div class="w3-modal-content">
      <div class="w3-card-4">

        <div class="w3-container">
          <h4>Create New Card</h4>

          <div v-if="parent !== null" class="w3-row">
            <b>parent: {{ parent.title }}</b>
          </div>

          <div class="w3-row">
            <label for="">Title</label>
            <input class="w3-input" v-model="title" type="text" name="" value="">
          </div>
          <div class="w3-row w3-margin-top">
            <label for="">Content</label>
            <textarea class="w3-input w3-border" v-model="content" name="name" rows="3" cols="80"></textarea>
          </div>
          <div class="w3-row w3-margin-top">
            <button @click="$emit('please-close')" class="w3-button w3-gray" type="button" name="button">cancel</button>
            <button @click="createCard()" class="w3-button w3-blue" type="button" name="button">save</button>
          </div>
          <div class="w3-row w3-margin-top">
            <div class="w3-panel w3-pale-green">
              <p>{{ sentResult }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { send } from '../hc.js'

export default {
  props: {
    parent: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      title: '',
      content: '',
      sentResult: 'pending'
    }
  },
  methods: {
    createCard () {
      console.log('send')
      var parentHash = this.parent !== null ? this.parent.hash : ''
      send("cardCreate", {
        parentHash: parentHash,
        title: this.title,
        content: this.content,
        showNew: false
      }, (data) => {
        this.sentResult = data;
        if (this.parent === null) {
          send("cardAddAsFavorite", data, (hash) => {
            this.$emit('card-created')
            this.updateMyCards();
          })
        }
      })
    }
  }
}
</script>

<style scoped>


</style>
