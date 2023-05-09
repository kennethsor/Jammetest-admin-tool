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
      if (this.testRunning) {
        this.$refs.testInfo.setTestStartTime(new Date());
      }
      else {
        this.$refs.testInfo.setTestStartTime(null)
      }
    },
    onNextTest(parameter) {
      this.$refs.testPicker.onNextTest();
    },
    onPreviousTest(parameter) {
      this.$refs.testPicker.onPreviousTest();
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
      <div class="col">
        <JammetestTimer :datetime=datetime></JammetestTimer>
      </div>
      <div class="col">
        <JammetestTestPicker @update-test="updateItem" ref="testPicker">
        </JammetestTestPicker>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <JammetestTestInfo :testName="selectedItem ? selectedItem.name : 'Not selected'"
          :testDescription="selectedItem ? selectedItem.description : 'Not selected'" :testRunning="testRunning"
          :currentTime="datetime" ref="testInfo">
        </JammetestTestInfo>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <JammetestTextControl @toggle-test-running="toggleTestRunning" @set-previous-test="onPreviousTest"
          @set-next-test="onNextTest"></JammetestTextControl>
      </div>
    </div>
  </div>
</template>