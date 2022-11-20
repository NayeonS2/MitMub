<template>
  <div class="container">
    <div class="row">
        <div class="col-9">
            <input type="text" id="comment" class="form-control" v-model.trim="comment" @keypress.enter="createComment">
        </div>
        <div class="col-1"></div>
        <div class="col-2 d-grid gap-2 d-md-flex justify-content-md-end text-center">

            <button @click="createComment" class="btn btn-light form-control me-md-3">✍</button>
            <div class="me-md-4"></div>
        </div>
       
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
    name: 'CreateCommentView',
    data() {
        return {
            comment: ''
        }
    },
    props: {
        review: Object,
    },
    methods: {
        createComment() {
            const ReviewComment = {
                review: this.review.id,
                content: this.comment,
            }

            if (ReviewComment.content) {
                axios({
                    method: 'post',
                    url: `${API_URL}/api/v1/movies/create_comment/${this.review.id}/`,
                    data: {
                        
                        review: ReviewComment.review,
                        content: ReviewComment.content,
                    },
                    headers: {
                        Authorization: `Token ${this.$store.state.token}`
                    }
                })
                .then(() => {
                    //this.$emit('refresh')
                    alert("댓글 작성 완료!")
                    this.comment = ''
                })
                .catch((err) => { 
                    console.log(err)
                })
            }
        },

        
    }
}
</script>

<style>

</style>