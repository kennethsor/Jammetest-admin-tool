<script>
import JammetestTimer from '../components/JammetestTimer.vue'
import JammetestTestPicker from '../components/JammetestTestPicker.vue'
import JammetestTestInfo from '../components/JammetestTestInfo.vue'
import JammetestTestControl from '../components/JammetestTestControl.vue'
import JammetestTestComment from '../components/JammetestTestComment.vue'
import JammetestSitePicker from '../components/JammetestSitePicker.vue'

export default {
  data() {
    return {
      sites: [],
      tests: [],
      datetime: new Date(),
      selectedSite: null,
      selectedTest: null,
      testRunning: false,
      isAuthenticated: this.$auth0.isAuthenticated
    }
  },
  components: {
    JammetestTimer,
    JammetestTestPicker,
    JammetestTestInfo,
    JammetestTestControl,
    JammetestTestComment,
    JammetestSitePicker
  },
  beforeMount() {
    this.axios.get('https://localhost:5172/api/testsites').then(sites => {
      this.sites = sites.data;
    }).catch(err => {
      console.log(err);
    });
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
      }).catch(e => {
        console.log(e)
      });
      this.axios.get('https://localhost:5172/api/testsites').then(sites => {
        this.sites = sites.data
      }).catch(err => {
        console.log(err)
      });
    },
    updateSite(site) {
      this.selectedSite = site;
      this.axios.get('https://localhost:5172/api/testdefinitions/:' + site).then(tests => {
        this.tests = tests.data;
      }).catch(err => { console.log(err) });
    },
    updateTest(test) {
      this.selectedTest = test;
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
      console.log('******* toggleTestRunning *******');
      this.testRunning = !this.testRunning;

      this.testRunning ? console.log('test is running') : console.log('test is not running');

      // set the start date of the selected site
      if (this.testRunning) {
        const now = new Date();
        this.$refs.testInfo.setTestStartTime(now);
        this.selectedTest.started = now.toISOString();
      }
      else {
        // stop the test
        // communicate this to the JammetestInfo component
      }


      // update the underlying control object through the REST API

      // Store the updates (must be done on the backend side)
      // this.testRunning = running;
      // if (this.testRunning) {
      //   this.$refs.testInfo.setTestStartTime(new Date());
      // }
      // else {
      //   this.$refs.testInfo.setTestStartTime(null)
      // }
    },
    onNextTest(parameter) {
      console.log('******* onNextTest *******');
      // this.$refs.testPicker.onNextTest();
    },
    onPreviousTest(parameter) {
      console.log('******* onPreviousTest *******');
      // this.$refs.testPicker.onPreviousTest();
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
      <JammetestSitePicker :sites="sites" @update-site="updateSite"></JammetestSitePicker>
      <JammetestTestPicker :tests="tests" @update-test="updateTest"></JammetestTestPicker>
      <JammetestTestControl @toggle-test-running="toggleTestRunning" @set-previous-test="onPreviousTest"
        @set-next-test="onNextTest"></JammetestTestControl>
    </div>
    <div class="col-lg-6">
      <JammetestTestInfo :testName="this.selectedTest ? this.selectedTest.name : 'no test chosen'"
        :testDescription="this.selectedTest ? this.selectedTest.description : 'no test chosen'"
        :testRunning="this.testRunning" :testStartTime="this.selectedTest ? this.selectedTest : null"
        :currentTime="this.datetime" ref="testInfo"></JammetestTestInfo>
    </div>
  </div>
</template>