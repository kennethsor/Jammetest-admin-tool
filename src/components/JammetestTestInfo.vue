<script>
export default {
    props: {
        testName: String,
        testDescription: String,
        testRunning: Boolean
    }
}
</script>
<template>
        <div class="card">
        <div class="card-header">
            Test information
        </div>
        <div class="card-body">
            <h4>Test name: {{ testName }}</h4>
            <h4>Test description: {{ testDescription }}</h4>
            <h4>Test running: {{ testRunning ? 'Yes' : 'No' }}</h4>
        </div><br>
    </div>
</template>