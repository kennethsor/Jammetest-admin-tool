<script>
export default {
    data() {
        return {
            selectedTest: null,
            selectedSite: null,
            tests: []
        }
    },
    methods: {
        setSite(site) {
            this.selectedSite = site;
            this.loadTests();
        },
        loadTests() {

            this.axios.get('https://localhost:5172/api/testdefinitions/:' + this.selectedSite)
                .then(resp => {
                    this.tests = resp.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        dropdownOnClick(item) {
            this.selectedTest = item;
            this.$emit('update-test', this.selectedTest);
        }
    }, 
    expose: ['setSite']
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
                    {{ selectedTest ? selectedTest.name : "Choose a test" }}
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