<script>
export default {
    data() {
        return {
            selectedSite: null,
            selectedTest: null,
            testRunning: false
        }
    },
    props: ['currentTime'],
    expose: ['updateTestInfo'],
    methods: {
        updateTestInfo(site, test) {
            this.selectedSite = site;
            this.selectedTest = test;

            console.log(this.test);
            this.checkIfTestIsRunning(this.selectedSite, this.selectedTest.id, (err, status)=> {
                if(!err){
                    this.testRunning = status;
                }
                else{
                    this.testRunning = false;
                }
            });

            // this.axios.get(
            //     'https://test.ing:5172/api/testrunning/:' + this.selectedSite + '/:' + this.selectedTest.id)
            //         .then(resp => {
            //             this.testRunning = resp.data;
            //         }).catch(err => {
            //             console.log(err);
            //         });
        },
        checkIfTestIsRunning(site, test, done) {
            this.axios.get(
                'https://test.ing:5172/api/testrunning/:' + site + '/:' + test)
                    .then(resp => {
                        done(null, resp.data);
                        //return resp.data;
                    }).catch(err => {
                        console.log(err);
                        done(err, null);
                        //return false;
                    });
        },
        formatElapsedTime() {
            this.checkIfTestIsRunning(this.selectedSite, this.selectedTest.id, (err, status) => {
                if(!err) {
                    this.testRunning = status;
                    console.log('Test running: ' + this.testRunning);
                }
                else {
                    this.status = false;ß
                }
            });


            const startime = new Date(this.selectedTest.started);
            var seconds = parseInt((this.currentTime.getTime()-startime.getTime())/1000);

            return(seconds-(seconds%=60))/60+(9<seconds?':':':0')+seconds;
        }
    }
}
</script>
<template>
    <div class="card border-dark">
        <div class="card-header bg-light">
            Test information
        </div>
        <div class="card-body">
            <h4>Test name: {{ selectedTest ? selectedTest.name : 'No test chosen' }}</h4>
            <h4>Test description: {{ selectedTest ? selectedTest.description : '' }}</h4>
            <h4>Test running: {{ testRunning ? 'Yes' : 'No' }}</h4>
            <h5>Start time {{ testRunning ? selectedTest.started : ""}}</h5>
            <h5>Elapsed time: {{ testRunning ? formatElapsedTime() : '0'}} min</h5>
        </div>
    </div>
</template>