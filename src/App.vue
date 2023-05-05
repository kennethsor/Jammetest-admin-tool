<script>
import JammetestNavbar from './components/JammetestNavbar.vue'
import JammetestTimer from './components/JammetestTimer.vue'
import JammetestTestInfo from './components/JammetestTestInfo.vue'

export default {
  data() {
    return {
      datetime: new Date(),
      selectedItem: null
    }
  },
  components: {
    JammetestNavbar,
    JammetestTimer,
    JammetestTestInfo
  },
  mounted() {
    this.timer = setInterval(this.updateDatetime, 1000);
  },
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  methods: {
    updateDatetime() {
      this.datetime = new Date();
    },
    updateItem(item) {
      this.selectedItem = item;
    }
  }
}

</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <JammetestNavbar class="fixed-top"></JammetestNavbar>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <JammetestTimer :datetime=datetime></JammetestTimer>
      </div>
      <div class="col-6">
        <JammetestTestInfo @update-test="updateItem"></JammetestTestInfo>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>Name: {{ selectedItem ? selectedItem.name : "Not selected" }}</p>
        <p>Description: {{ selectedItem ? selectedItem.description : "Not selected"  }}</p>
      </div>
    </div>
  </div>
</template>