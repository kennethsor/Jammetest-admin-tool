<script>
export default {
    data() {
        return {
            testRunning: false
        }
    },
    props: ['selectedSite', 'selectedTest'],
    mounted() {
        console.log('Mouting.....');
        console.log(this.selectedTest);
    },
    methods: {
        onClickRunStop() {
            this.$emit('toggle-test-running', this.testRunning);
            this.testRunning = !this.testRunning;
        },
        onClickPrevious() {
            if (!this.testRunning) {
                this.$emit('set-previous-test', 'previous');
            }
        },
        onClickNext() {
            if (!this.testRunning) {
                this.$emit('set-next-test', 'next');
            }
        },
        runStatusUpdated(status) {
            console.log('Run Status updatet!!!');
            console.log(this.selectedTest);
            this.testRunning = status;
        }
    },
    expose: ['runStatusUpdated']
}
</script>
<template>
        <div class="card border-dark">
        <div class="card-header bg-light">
            Test control
        </div>
        <div class="card-body text-center">
            <button class="btn btn-primary btn-space-right" @click="onClickPrevious"><i class="bi-skip-backward-fill"
                    style="font-size: 2rem;"></i></button>
            <button v-bind:class="[!this.testRunning ? 'btn btn-primary' : 'btn btn-danger']" @click="onClickRunStop"><i
                    v-bind:class="[!this.testRunning ? 'bi-play-circle-fill' : 'bi-pause-circle-fill']"
                    style="font-size: 2rem;"></i></button>
            <button class="btn btn-primary btn-space-left" @click="onClickNext"><i class="bi-skip-forward-fill"
                    style="font-size: 2rem;"></i></button>
        </div><br>
    </div>
</template>
<style>
.btn-space-left {
    margin-left: 2px;
}

.btn-space-right {
    margin-right: 2px;
}
</style>