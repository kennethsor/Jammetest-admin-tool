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
            selectedTest: null,
            selectedTestRunning: false,
            counter: 0,
            debugText: '',
            isAuthenticated: this.$auth0.isAuthenticated
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

            this.axios.get('https://test.ing:5172/api/servertime')
                .then(resp => {
                    this.datetime = new Date(resp.data.date);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        updateSite(site) {
            this.selectedSite = site;
            console.log('Check if there are running tests on the site...');
            this.$refs.testPicker.setSite(site);
        },
        updateTest(test) {
            this.selectedTest = test;
            this.$refs.testInfo.updateTestInfo(this.selectedSite, this.selectedTest);

            if (this.isAuthenticated) {
                if (this.selectedTest.started && this.selectedTest.ended) {
                    this.$refs.testControl.runStatusUpdated(true);
                }
                else {
                    this.$refs.testControl.runStatusUpdated(false);
                }
            }

        },
        toggleTestRunning(running) {
            this.axios.post(
                import.meta.env.VITE_APP_REST_DOMAIN,
                {
                    "client_id": import.meta.env.VITE_APP_REST_REST_CLIENT_ID,
                    "client_secret": import.meta.env.VITE_APP_REST_CLIENT_SECRET,
                    "audience": import.meta.env.VITE_APP_REST_AUDIENCE,
                    "grant_type": "client_credentials"
                }, {
                headers: { "content-type": "application/json" }
            }
            ).then(resp => {
                const token = resp.data.access_token;
                if (!running) {
                    console.log('Starting test ' + this.selectedTest.id + ' at site ' + this.selectedSite);

                    this.axios.post(
                        'https://test.ing:5172/api/starttest',
                        { site: this.selectedSite, test: this.selectedTest.id },
                        {
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        }).then(resp => {
                            this.axios.get('https://test.ing:5172/api/testdefinitions/:' + this.selectedSite + '/:' + this.selectedTest.id)
                                .then(resp => {
                                    this.selectedTest = resp.data;
                                    this.$refs.testInfo.updateTestInfo(this.selectedSite, this.selectedTest);
                                })
                                .catch(gerr => console.log(gerr));
                        }).catch(err => {
                            console.log(err);
                        });
                }
                else {
                    console.log('Stopping test ' + this.selectedTest.id + ' at site ' + this.selectedSite);
                    this.axios.post(
                        'https://test.ing:5172/api/stoptest',
                        { site: this.selectedSite, test: this.selectedTest.id },
                        {
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        }).then(resp => {
                            this.axios.get('https://test.ing:5172/api/testdefinitions/:' + this.selectedSite + '/:' + this.selectedTest.id)
                                .then(resp => {
                                    this.selectedTest = resp.data;
                                    this.$refs.testInfo.updateTestInfo(this.selectedSite, this.selectedTest);
                                })
                                .catch(gerr => console.log(gerr));
                        }).catch(err => {
                            console.log(err);
                        });
                }
            }).catch(err => {
                console.log(err);
            });

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
            <JammetestTestControl v-if="this.isAuthenticated" 
                @toggle-test-running="toggleTestRunning"
                @set-previous-test="onSetPreviousTest" 
                @set-next-test="onSetNextTest" 
                :selectedSite="this.selectedSite"
                :selectedTest="this.selectedTest"
                ref="testControl">
            </JammetestTestControl>
        </div>
    </div>
</template>