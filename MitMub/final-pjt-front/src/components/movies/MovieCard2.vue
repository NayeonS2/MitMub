<template>
  <div class="movie-item">
    <div id="movie-poster">
      <img id="movie-id" :src="imgSrc" alt="포스터 없음" class="img-fluid rounded" style="width: 204px; height: 298px;" @click="toDetail(movie.id)"/>
      <h3 id="fingerP" class="text-light" @click="toDetail(movie.id)">$ mit status</h3>
        <!-- button은 안 보이다가 hover 되면 보이게 -->
        <!-- <button
          type="button"
          class="detail-btn btn btn-primary text-align-center" 
          >
          상세보기
        </button> -->
      </div>
    <!-- 모달 디테일 페이지 작업 // 죽은 코드 // 필요하면 갖다 쓰기 !-->
    <div class="modal fade" :id='id' tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="movie-detail-info modal-dialog modal-dialog-centered ">
        <!-- info header -->
        <div class="modal-content">
          <div class="modal-header">
            <img src="@/assets/images/RowLogo.png" 
              style="
              width: 120px;
              height: 60px;">
            <div type="button" data-bs-dismiss="modal">
              ❌
            </div>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col">
                  <img :src="imgSrc" alt="포스터 없음" class="img-fluid rounded border border-light" style="width: 318px; height: 450px;" />
                </div>
                <div class="col">
                  <h4 class="movie-detail-title">
                    Title : {{ movie.title }}
                  </h4>
                  <div v-if="movie.release_date">
                    개봉 : {{ movie.release_date }}
                  </div>
                  <div v-if="movie.genres">
                    <!-- {{ movie.genre_ids }} -->
                  </div>
                  <div class="movie-vote">
                    평점 : {{ movie.vote_average }}
                  </div>
                  <hr>
                  <!-- info over view -->
                  <div class="movie-detail-overview-header">
                    줄거리
                  </div>
                  <hr>
                  <div v-if="movie.overview" class="movie-detail-overview-body">
                    {{ movie.overview }}
                  </div>
                  <div v-else class="movie-detail-overview-body">
                    해당 영화는 줄거리가 제공되지 않습니다.
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          <div>
            <p>모달 푸터 : 유튜브 영상 넣을 곳</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import YoutubeList from '@/components/movies/YoutubeList'

export default {
  name: 'MovieCard2',
  components: {
 
  },
  props: {
    movie: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    }
  },
  computed: {
    imgSrc () {
      return "https://image.tmdb.org/t/p/original" + this.movie.poster_path
    },
    id () {
      return `detailModal${this.movie.id}`
    }
    ,
    id2() {
      return `#detailModal${this.movie.id}`
    }
  },
  methods: {
    toDetail(id){
      this.$router.push({name:'DetailView', params: {id}})
    }
  }
}
</script>

<style>
/* .detail-btn {
  position: absolute;
  width: 100px;
  height: 35px;
  z-index: auto;
  left: calc(50% - 50px);
  bottom: 37%;
  transition: all 0.5s;
  opacity: 0;
  } */

#movie-poster {
  filter: brightness(1);
  position: relative;
}
/* .movie-poster:hover .detail-btn {
  transition: all 0.5s;
  opacity: 1;
  } */
#movie-poster:hover #movie-id{
  filter: brightness(0.5);
  transform: scale(1.1);
  }

#fingerP {
  position: absolute;
  width: 100px;
  height: 35px;
  z-index: auto;
  left: calc(50% - 50px);
  bottom: 37%;
  transition: all 0.5s;
  opacity: 0;
}

#movie-poster:hover #fingerP{
  transition: all 0.5s;
  opacity: 1;
  }

/* .modal-content{
  min-width: 768px;
} */
</style>