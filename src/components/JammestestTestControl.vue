<script>
export default {
    data() {
        return {
            testRunning: false,
            debugMessage: 'Nothing has happened'
        }
    },
    methods: {
        onClickRunStop() {
            this.testRunning = !this.testRunning;
            this.debugMessage = this.testRunning ? 'Test is running' : 'Test is not running';
            this.$emit('toggle-test-running',this.testRunning);
        },
        onClickPrevious() {
            this.debugMessage = 'Clicked previous';
            this.$emit('set-previous-test', 'previous');
        },
        onClickNext() {
            this.debugMessage = 'Clicked next';
            this.$emit('set-next-test', 'next');
        }
    }
}
</script>
<template>
    <div class="card">
        <div class="card-header">
            Test control
        </div>
        <div class="card-body text-center">
            <button class="btn btn-primary btn-space-right" @click="onClickPrevious"><i class="bi-skip-backward-fill" style="font-size: 3rem;"></i></button>
            <button v-bind:class="[!testRunning ? 'btn btn-primary' : 'btn btn-danger']" @click="onClickRunStop"><i v-bind:class="[!testRunning ? 'bi-play-circle-fill' : 'bi-pause-circle-fill']" style="font-size: 3rem;"></i></button>
            <button class="btn btn-primary btn-space-left" @click="onClickNext"><i class="bi-skip-forward-fill" style="font-size: 3rem;"></i></button>
            <p>{{ debugMessage }}</p>
        </div><br>
    </div>
</template>
<style>
.btn-space-left {
    margin-left: 10px;
}
.btn-space-right {
    margin-right: 10px;
}
</style>
