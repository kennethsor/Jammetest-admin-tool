<script>
import JammetestNavbar from './components/JammetestNavbar.vue'
import JammetestTimer from './components/JammetestTimer.vue'
import JammetestTestPicker from './components/JammetestTestPicker.vue'
import JammetestTestInfo from './components/JammetestTestInfo.vue'
import JammetestTextControl from './components/JammestestTestControl.vue'

export default {
  data() {
    return {
      datetime: new Date(),
      selectedItem: null,
      testRunning: false
    }
  },
  components: {
    JammetestNavbar,
    JammetestTimer,
    JammetestTestPicker,
    JammetestTestInfo,
    JammetestTextControl
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
    },
    toggleTestRunning(running) {
      this.testRunning = running; 
    },
    onNextTest(parameter){
      // TODO: implement call to child to set next test
    },
    onPreviousTest(parameter) {
      // TODO: implement call to child to set next test
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
        <JammetestTestPicker 
          @update-test="updateItem">
        </JammetestTestPicker>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <JammetestTestInfo 
          :testName="selectedItem ? selectedItem.name : 'Not selected'" 
          :testDescription="selectedItem ? selectedItem.description : 'Not selected'"
          :testRunning="testRunning">
        </JammetestTestInfo>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <JammetestTextControl 
        @toggle-test-running="toggleTestRunning"
        @set-previous-test="onPreviousTest"
        @set-next-test="onNextTest"></JammetestTextControl>
      </div>
    </div>
  </div>
</template>