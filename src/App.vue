<script>
import JammetestNavbar from './components/JammetestNavbar.vue'
import JammetestTimer from './components/JammetestTimer.vue'
import JammetestTestPicker from './components/JammetestTestPicker.vue'
import JammetestTestInfo from './components/JammetestTestInfo.vue'
import JammetestTextControl from './components/JammetestTestControl.vue'
import JammetestTestComment from './components/JammetestTestComment.vue'

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
    JammetestTextControl,
    JammetestTestComment
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
    },
    updateComment(comment){
      this.$refs.testPicker.updateComment(comment);
    }
  }
}

</script>
<template>
  <div class="container vw-100 fixed-top">
    <div class="row">
      <div class="col-lg-12">
        <JammetestNavbar></JammetestNavbar>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <JammetestTimer :datetime=datetime></JammetestTimer>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6">
        <JammetestTestInfo :testName="selectedItem ? selectedItem.name : 'Not selected'"
          :testDescription="selectedItem ? selectedItem.description : 'Not selected'" :testRunning="testRunning"
          :currentTime="datetime" ref="testInfo">
        </JammetestTestInfo>
      </div>
      <div class="col-lg-6">
        <JammetestTestComment :testComment="selectedItem ? selectedItem.comments : 'No comments'" @update-comment="updateComment"></JammetestTestComment>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6">
        <JammetestTestPicker @update-test="updateItem" ref="testPicker">
        </JammetestTestPicker>
      </div>
      <div class="col-lg-6">
        <JammetestTextControl @toggle-test-running="toggleTestRunning" @set-previous-test="onPreviousTest"
          @set-next-test="onNextTest"></JammetestTextControl>
      </div>
    </div>
  </div>
</template>