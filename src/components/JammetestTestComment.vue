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
            if(!this.textDisabled) {
                this.saveComment(this.testComment);
            }
            this.textDisabled = !this.textDisabled;
        },
        saveComment(comment) {
            this.debugText = 'Comments was updated with: ' + comment;
            this.$emit('update-comment', comment);
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
            </div>
        </div><br>
    </div>
</template>
<style>
textarea {
    vertical-align: top;
}
</style>