<script>
export default {
    data() {
        return {
            testStartTime: null,
            elapsedTime: null
        }
    },
    props: {
        testName: String,
        testDescription: String,
        testRunning: Boolean,
        currentTime: Date
    },
    methods: {
        setTestStartTime(datetime) {
            if(!datetime){
                this.elapsedTime = 0;
            }
            this.testStartTime = datetime;
        },
        formatElapsedTime(seconds) {
            return(seconds-(seconds%=60))/60+(9<seconds?':':':0')+seconds;
        }
    },
    expose: ['setTestStartTime']
}
</script>
<template>
        <div class="card border-dark">
        <div class="card-header bg-light">
            Test information
        </div>
        <div class="card-body">
            <h4>Test name: {{ testName }}</h4>
            <h4>Test description: {{ testDescription }}</h4>
            <h4>Test running: {{ testRunning ? 'Yes' : 'No' }}</h4>
            <h5>Start time: {{ testStartTime ? testStartTime.toISOString() : ''}}</h5>
            <h5>Elapsed time: {{ testRunning ? formatElapsedTime(parseInt((currentTime.getTime() - testStartTime.getTime()) / 1000)) : 0 }} m</h5>
        </div><br>
    </div>
</template>