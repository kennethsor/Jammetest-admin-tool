<script>
import tests from './../testdefinitions/test_definitions.json'


export default {
    data() {
        return {
            tests: tests.tests,
            selectedItem: null
        }
    },
    methods: {
        dropdownOnClick(item) {
            this.selectedItem = item;
            this.$emit('update-test', this.selectedItem);
        },
        onNextTest() {
            if(!this.selectedItem) {
                this.dropdownOnClick(this.tests[0]);
            }
            else{
                const currentTestIdx = this.tests.indexOf(this.selectedItem);
                if(this.tests.length - 1 > currentTestIdx){
                    this.dropdownOnClick(this.tests[currentTestIdx + 1]);
                }
                // in any other case, do nothing since it is the last element
            }
        },
        onPreviousTest() {
            if(!this.selectedItem) { // default to the first test
                this.dropdownOnClick(this.tests[0]);
            }
            else{
                const currentTestIdx = this.tests.indexOf(this.selectedItem);
                if (currentTestIdx > 0) {
                    this.dropdownOnClick(this.tests[currentTestIdx - 1]);
                }
                // in any other case, do nothing since it is the first element
            }
        }
    },
    mounted() {
        this.dropdownOnClick(this.tests[0]);
    },
    expose: ['onNextTest', 'onPreviousTest']
}

</script>
<template>
    <div class="card border-dark">
        <div class="card-header bg-light">
            Choose test
        </div>
        <div class="card-body">
            <div class="dropdown">
                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    {{ selectedItem ? selectedItem.name : "Choose a test" }}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li v-for="test in tests" :key="test.id" @click="dropdownOnClick(test)">
                        {{ test.name }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>