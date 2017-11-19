var app = new Vue({
  el: '#app',
  data: {
    title: '',
    content: '',
    sentResult: 'data pending',
    myCards: [],
    parent: '',
    showNewSubCardModal: true
  },
  computed: {

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
    },
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
            this.updateMyCards();
          })
        }
      })
    },
    showNewSubCard (card) {
      this.parent = card
      this.showNewSubCardModal = true
    },
    createRootCard () {
      this.parent = null;
      this.showNewSubCardModal = true
    }
  },
  created () {
    this.updateMyCards();
  }
})
