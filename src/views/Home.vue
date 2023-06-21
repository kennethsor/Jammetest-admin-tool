<script>
import JammetestTimer from '@/components/JammetestTimer.vue'
import JammetestSitePicker from '@/components/JammetestSitePicker.vue'
import JammetestTestPicker from '@/components/JammetestTestPicker.vue'
import JammetestTestInfo from '@/components/JammetestTestInfo.vue'
import JammetestTestControl from '@/components/JammetestTestControl.vue'

export default {
    data() {
        return {
            timer: null,
            datetime: new Date(),
            selectedSite: null,
            selectedTest: null
        }
    },
    components: {
        JammetestTimer,
        JammetestSitePicker,
        JammetestTestPicker,
        JammetestTestInfo,
        JammetestTestControl
    },
    beforeMount() {

    },
    mounted() {
        this.timer = setInterval(this.updateDatetime, 1000);
    },
    beforeUnmount() {

    },
    methods: {
        updateDatetime() {
            this.axios.get('https://localhost:5172/api/servertime')
                .then(resp => {
                    this.datetime = new Date(resp.data.date);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        updateSite(site) {
            this.selectedSite = site;
            this.$refs.testPicker.setSite(site);
        },
        updateTest(test) {
            this.selectedTest = test;
            this.$refs.testInfo.updateTestInfo(this.selectedSite, this.selectedTest);
        },
        toggleTestRunning(running) {
            if (!running) {
                this.axios.post('https://localhost:5172/api/starttest', { site: this.selectedSite, test: this.selectedTest.id })
                    .then(resp => {
                        this.axios.get('https://localhost:5172/api/testdefinitions/:' + this.selectedSite + '/:' + this.selectedTest.id)
                            .then(resp => {
                                this.selectedTest = resp.data;
                                this.$refs.testInfo.updateTestInfo(this.selectedSite, this.selectedTest);
                            })
                            .catch(gerr => console.log(gerr));
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            else {
                this.axios.post('https://localhost:5172/api/stoptest', { site: this.selectedSite, test: this.selectedTest.id })
                    .then(resp => {
                        this.axios.get('https://localhost:5172/api/testdefinitions/:' + this.selectedSite + '/:' + this.selectedTest.id)
                            .then(resp => {
                                this.selectedTest = resp.data;
                                this.$refs.testInfo.updateTestInfo(this.selectedSite, this.selectedTest);
                            })
                            .catch(gerr => console.log(gerr));
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }

        },
        onSetPreviousTest() {
            console.log('Previous test');
        },
        onSetNextTest() {
            console.log('Next test');
        }
    }
}
</script>
<template>
    <div class="row">
        <div class="col-lg-12">
            <JammetestTimer :datetime="datetime"></JammetestTimer>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-6">
            <JammetestSitePicker @update-site="updateSite"></JammetestSitePicker>
            <JammetestTestPicker @update-test="updateTest" ref="testPicker"></JammetestTestPicker>
        </div>
        <div class="col-lg-6">
            <JammetestTestInfo ref="testInfo" :currentTime="datetime"></JammetestTestInfo>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-6">
            <JammetestTestControl @toggle-test-running="toggleTestRunning" @set-previous-test="onSetPreviousTest"
                @set-next-test="onSetNextTest"></JammetestTestControl>
        </div>
    </div>
</template>