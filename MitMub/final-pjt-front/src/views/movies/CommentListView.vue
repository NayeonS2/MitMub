<template>
  <div>
    <ul style="list-style:none; padding: 0;">
      <li v-for="(comment, idx) in comments" :key="idx" style="text-align: left;">
        <div class="row">

           <div class="col-auto">

            {{ comment.user }} : {{ comment.content }}
          </div>
          <div class="col-3 d-grid gap-2 d-md-flex justify-content-md-end text-center">
            <p v-if="comment.user === user" @click="deleteComment(comment)" class="me-md-5">❌</p>
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
      userId: Number,
    },
    data() {
      return {
        comments: [],
        user: this.$store.state.profile.username,
        comment_length: 0,
        commentUser: '',
      }
    },
    computed: {
    
    },
    methods: {
      toDetail(userId){
          console.log(userId)
          if (Number(userId) !== Number(this.$store.state.profile.id)) {
            this.$router.push({name:'YourDetailProfileView', params: {'userId':Number(userId)}})
            
          }
        
            },
      

      getComments() {
        axios({
              method: 'get',
              url: `${API_URL}/api/v1/movies/create_comment/${this.review.id}/`,
              headers: {
                      Authorization: `Token ${this.$store.state.token}`
                  }
          })
          .then(res => {
            //console.log(res)

            this.comments = res.data

            for (var comment of this.comments) {
                for (var user of this.$store.state.users) {
                if (comment.user === user.id){
                    comment.user = user.username
                    this.commentUser = user.id
                        }
                    }
                }
            
          })
          .catch(err => {
            console.log(err)
          })
      },
      deleteComment(comment) {
                axios({
                    method: 'delete',
                    url: `${API_URL}/api/v1/movies/delete_comment/${comment.id}/`,
                 
                    headers: {
                        Authorization: `Token ${this.$store.state.token}`
                    }
                })
                .then((res) => {
                    this.$store.commit('ADD_REFRESH_DC')
                    //console.log(res)
               
                    window.alert("댓글이 삭제 되었습니다!")
           
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