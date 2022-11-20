<template>
  <div>
    <ul>
      <li v-for="(comment, idx) in comments" :key="idx" style="text-align: left;">
        <div class="row">
           <div class="col-auto">
            {{ user }} : {{ comment.content }}
          </div>
          <div class="col-auto d-grid gap-2 d-md-flex justify-content-md-end text-center">
            <button v-if="comment.user === user" @click="deleteComment(comment)" class="btn btn-light form-control me-md-5">❌</button>
          </div>
        
        </div>
       
        
      </li> 
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'
export default {
    name: 'CommentListView',
    props: {
      review: Object,
    },
    data() {
      return {
        comments: [],
        user: this.$store.state.profile.username,
        comment_length: 0,
      }
    },
    computed: {
    
    },
    methods: {

      getComments() {
        axios({
              method: 'get',
              url: `${API_URL}/api/v1/movies/create_comment/${this.review.id}/`,
              headers: {
                      Authorization: `Token ${this.$store.state.token}`
                  }
          })
          .then(res => {
            console.log(res)

            this.comments = res.data

            for (var comment of this.comments) {
                for (var user of this.$store.state.users) {
                if (comment.user === user.id){
                    comment.user = user.username
                        }
                    }
                }
            
          })
          .catch(err => {
            console.log(err)
          })
      },
      deleteComment(comment) {
                alert("댓글을 삭제하시겠습니까?")
                axios({
                    method: 'delete',
                    url: `${API_URL}/api/v1/movies/delete_comment/${comment.id}/`,
                 
                    headers: {
                        Authorization: `Token ${this.$store.state.token}`
                    }
                })
                .then((res) => {
                    this.$store.state.refresh ++
                    console.log(res)
               
                    window.alert("댓글 삭제 완료!")
           
                    this.$router.push({ name: 'ReviewDetailView', params: {reviewId: this.review.id} })
                })
                .catch((err) => { 
                    console.log(err)
                })
            
        }
    },
    created() {
      this.getComments()
  
    }
}
</script>

<style>

</style>