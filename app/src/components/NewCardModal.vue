<template lang="html">
  <div class="w3-modal">
    <div class="w3-modal-content">
      <div class="w3-card-4">

        <div class="w3-container">
          <h3 v-if="parent === null">Create new card</h3>
          <h3 v-else>Create new subcard of <br><i>{{ parent.title }}</i></h3>

          <hr>
          <div class="w3-row">
            <label for="">Title</label>
            <input class="w3-input" v-model="title" type="text" name="" value="">
          </div>
          <div class="w3-row w3-margin-top">
            <label for="">Content</label>
            <textarea class="w3-input w3-border" v-model="content" name="name" rows="3" cols="80"></textarea>
          </div>
          <div class="w3-row w3-margin-top">
            <button @click="$emit('please-close')" class="w3-button w3-gray w3-round-large" type="button" name="button">cancel</button>
            <button @click="createCard()" class="w3-button w3-blue w3-round-large" type="button" name="button">create</button>
          </div>
          <div v-if="sentError" class="w3-row w3-margin-top">
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
import { send, isErr } from '../hc.js'

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
      sentError: '',
      sentResult: ''
    }
  },
  methods: {
    createCard () {
      var parentHash = this.parent !== null ? this.parent.hash : ''

      send("cardCreate", {
        parentHash: parentHash,
        title: this.title,
        content: this.content,
        showNew: false
      }, (data) => {

        if (isErr(data)) {
          this.sentResult = data;
          this.sentError = true;
        } else {
          if (this.parent === null) {
            send("cardAddAsFavorite", data, (hash) => {
              this.$emit('card-created');
              this.$emit('please-close');
            })
          } else {
            this.$emit('card-created');
            this.$emit('please-close');
          }
        }
      })
    }
  }
}
</script>

<style scoped>

button {
  width: 100px;
}

</style>
