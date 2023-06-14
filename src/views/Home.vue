<script>
import JammetestTimer from '../components/JammetestTimer.vue'
import JammetestTestPicker from '../components/JammetestTestPicker.vue'
import JammetestTestInfo from '../components/JammetestTestInfo.vue'
import JammetestTextControl from '../components/JammetestTestControl.vue'
import JammetestTestComment from '../components/JammetestTestComment.vue'

export default {
  data() {
    return {
      testDefinitions: [],
      datetime: new Date(),
      selectedItem: null,
      testRunning: false,
      isAuthenticated: this.$auth0.isAuthenticated
    }
  },
  components: {
    JammetestTimer,
    JammetestTestPicker,
    JammetestTestInfo,
    JammetestTextControl,
    JammetestTestComment
  },
  beforeMount() {
    this.axios.get('https://localhost:5172/api/testDefinitions').then(definitions => {
      this.testDefinitions = definitions.data;
      console.log(this.testDefinitions);
      this.axios.get('https://localhost:5172/api/currentTest').then(currentTest => {
        this.selectedItem = currentTest.data;
      }).catch(currentTestError => { conso.log(currentTestError) });
    }).catch(definitionsError => { console.log(definitionsError) });
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
      this.axios.get('https://localhost:5172/api/servertime').then(resp => {
        this.datetime = new Date(resp.data.date);
        this.axios.get('https://localhost:5172/api/testDefinitions').then(definitions => {
          this.testDefinitions = definitions.data;
          console.log(this.testDefinitions);
          this.axios.get('https://localhost:5172/api/currentTest').then(currentTest => {
            this.selectedItem = currentTest.data;
          }).catch(currentTestError => { conso.log(currentTestError) });
        }).catch(definitionsError => { console.log(definitionsError) });
      }).catch(e => {
        console.log(e)
      });
    },
    updateItem(item) {
      this.axios.post('https://localhost:5172/api/currentTest', { selectedItem: item }).then(resp => {
        console.log(resp);
      }).catch(e => {
        console.log(err);
      })
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
    updateComment(comment) {
      //this.$refs.testPicker.updateComment(comment);
      this.debugValue = comment;
    }
  }
}
</script>
<template>
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
    <div class="col-lg-6" v-if="isAuthenticated">
      <JammetestTestComment :testComment="selectedItem ? selectedItem.comments : 'No comments'"
        @update-comment="updateComment"></JammetestTestComment>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-6" v-if="isAuthenticated">
      <JammetestTestPicker :tests="testDefinitions" @update-test="updateItem" ref="testPicker">
      </JammetestTestPicker>
    </div>
    <div class="col-lg-6" v-if="isAuthenticated">
      <JammetestTextControl @toggle-test-running="toggleTestRunning" @set-previous-test="onPreviousTest"
        @set-next-test="onNextTest"></JammetestTextControl>
    </div>
  </div>
</template>