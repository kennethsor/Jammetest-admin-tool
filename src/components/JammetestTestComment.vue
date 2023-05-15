<script>
export default {
    props: ['testComment'],
    data() {
        return {
            textDisabled: true,
            debugText: ''
        }
    },
    methods: {
        onEditableClick() {
            // todo: emit a notification to the app.vue file to trigger an update of the list of tests
            if(!this.textDisabled) {
                this.debugText = 'Ready to save';
            }
            else{
                this.debugText = ''
            }
            this.textDisabled = !this.textDisabled;
        }
    },
    calculated: {

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
                <button v-bind:class="[textDisabled ? 'btn btn-primary' : 'btn btn-danger']" @click="onEditableClick">
                    <i v-bind:class="[textDisabled ? 'bi-pencil-fill' : 'bi-save-fill']"
                        style="font-size: 1rem;"></i></button>
                <div class="form-group">
                    <textarea :value="testComment" class="form-control text-left" id="commentsArea" rows="4"
                        :disabled="textDisabled" @input="event => testComment = event.target.value"></textarea>
                </div>
                <p>{{ debugText }}</p>
            </div>
        </div><br>
    </div>
</template>
<style>
textarea {
    vertical-align: top;
}
</style>