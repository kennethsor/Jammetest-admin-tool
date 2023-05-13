<script>
export default {
    props: ['testComment'],
    data() {
        return {
            textDisabled: true
        }
    },
    methods: {
        onEditableClick() {
            this.textDisabled = !this.textDisabled;
        }
    }
}
</script>
<template>
    <div class="card border-dark">
        <div class="card-header bg-light">
            Comments
        </div>
        <div class="card-body">
            <div class="form-outline">
                <button class="btn btn-primary" @click="onEditableClick">
                    <i v-bind:class="[textDisabled ? 'bi-pencil-fill' : 'bi-save-fill']"
                    style="font-size: 1rem;"></i></button>
                <textarea class="form-control" id="commentsArea" rows="4" :disabled="textDisabled">
                {{ testComment }}</textarea>
            </div>
        </div><br>
    </div>
</template>