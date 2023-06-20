<script>
export default {
    data() {
        return {
            selectedSite: null 
        }
    },
    props: {
        sites: Object
    },
    methods:{
        dropdownOnClick(item) {
            this.selectedSite = item;
            this.$emit('update-site', this.selectedSite);
        }
    },
    mounted() {

    }
}

</script>
<template>
    <div class="card border-dark">
        <div class="card-header bg-light">
            Choose a site
        </div>
        <div class="card-body">
            <div class="dropdown">
                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    {{ selectedSite ? selectedSite : "Choose a site" }}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li v-for="site in sites" :key="site" @click="dropdownOnClick(site)">
                        {{ site }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>