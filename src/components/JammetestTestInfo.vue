<script>
import tests from './../testdefinitions/test_definitions.json'


export default {
    data() {
        return {
            tests: tests.tests,
            selectedItem: null,
        }
    },
    methods: {
        dropdownOnClick(item) {
            this.selectedItem = item;
            this.$emit('update-test', this.selectedItem);
        }
    }
}

</script>
<template>
    <div class="card">
        <div class="card-header">
            Test definition
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
                </ul><br><br>
                <button type="button" class="btn btn-secondary">Set test</button>
            </div>
        </div>
    </div>
</template>