<template>
  <div class="mt-3" id="detail-view-main">
    <div tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="movie-detail-info">
        <!-- info header -->
        <div>
          <div>
            <div class="container-fluid">
              <div class="row">

                <div class="col-4 p-0" id="detail-div">
                  <img id="detail-img-profile" :src="imgSrc" alt="포스터 없음" class="img-fluid rounded" />
                </div>
                <div class="col-8">
                  <div id="타이틀">
                    <div class="row">
                      <h2 class="movie-detail-title col-5 text-end" style="height:50px; margin:0px 8px 0px;">
                        Title
                      </h2>
                      <h2 class="movie-detail-title col text-start" style="height:50px; margin:0px 8px 0px;">
                        {{ movie?.title }}
                      </h2>
                    </div>
                    <span id="detail-absoulute">
                      <PickMovieView :movie="movie" @refreshMovie="refreshMovie" />
                      <router-link :to="{ name: 'CreateReviewView', params: { movieId: movie?.id } }">리뷰쓰러 가기✏</router-link>
                    </span>
                  </div>
                  <div id="개봉 정보" v-if="movie?.release_date" class="row">
                    <div class="col-5 text-end">
                      개봉
                    </div>
                    <div class="col text-start">
                      {{ movie?.release_date }}
                    </div>
                  </div>
                  <div id="장르 정보" class="row" v-if="movie?.genres">
                    <div class="col-5 text-end">
                      장르
                    </div>
                    <div class="col text-start">
                      <span v-for="(gen, idx) in now_genre" :key="idx"> # {{ gen }} </span>
                    </div>
                  </div>
                  <div id="평점">
                    <div class="row" v-if="movie?.vote_average !== 0">
                      <div class="movie-vote col-5 text-end">
                        평점
                      </div>
                      <div class="movie-vote col text-start">
                        {{ movie?.vote_average }}
                      </div>
                    </div>
                    <div v-if="movie?.vote_average == 0" class="movie-vote">
                      아직 평점이 없는 영화입니다.
                    </div>
                  </div>
                  <div v-if="movie?.vote_average !== 0" class="star-ratings">
                    <div 
                      class="star-ratings-fill text-lg"
                      :style="{ width: ratingToPercent + '%' }"
                    >
                      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                    <div class="star-ratings-base text-lg">
                      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                  </div>
                  <div class="movie-vote">
                    <!-- 인기지수 : {{ movie?.popularity }} -->
                  </div>
                  <hr>
                  <!-- info over view -->
                  <div class="movie-detail-overview-header mb-3" @click="toggleOnOff">
                    줄거리 보기 🔽
                  </div>
                  <div v-if="isStatusOn">
                    <div v-if="movie?.overview" class="movie-detail-overview-body mb-3">
                      {{ movie?.overview }}
                    </div>
                    <div v-else class="movie-detail-overview-body mb-3">
                      해당 영화는 줄거리가 제공되지 않습니다.
                    </div>
                  </div>
                  <div class="justify-content-center">
                    <YoutubeDetail :video="selectedVideo"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row my-3 fw-semibold">
            <div class="my-3">'{{movie?.title}} 예고편'에 대한 검색 결과입니다. 🔽</div>
            <YoutubeList :videos="videos" @select-video="onSelectVideo" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import YoutubeList from '@/components/YoutubeList'
import YoutubeDetail from '@/components/YoutubeDetail'
import PickMovieView from '@/views/movies/PickMovieView'
// const API_KEY = 'AIzaSyCzV5aiqbmMpV8r7Xwdi8yGjm3MFD-MDok'
const API_KEY = 'AIk'

const API_URL = 'https://www.googleapis.com/youtube/v3/search'

export default {
  name: 'DetailView',
  components: {
    YoutubeList,
    YoutubeDetail,
    PickMovieView
  },
  data() {
    return {
      movie: null,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      inputValue: null,
      videos: [],
      selectedVideo: null,
      isStatusOn: false,
      searchText: '예고편',

      now_genre: [],
      
    }
  },
  computed: {
    genre() {
      return this.$store.state.genre
    },
    movies(){
      return this.$store.state.movies
    },
    imgSrc () {
      // console.log(this.movie)
      return "https://image.tmdb.org/t/p/original" + this.movie.poster_path
    },
    idSrc() {
      const idx = this.idx + 1
      return idx + 1.5
    },
    ratingToPercent() {
      const score = +this.movie.vote_average * 10;
      return score;
    },
    refreshPickMovieCnt() {
      return this.$store.state.refresh_pick_movie
    }
  },
  methods: {
    getMovieById(){
      const id = this.$route.params.id
      for(const movie of this.movies) {
        if(movie.id === Number(id)){
          this.movie = movie
          //console.log(this.movie.genres)
          //console.log(this.$store.state.genre)
          break
        }
      }
      if (this.movie === null){
        this.$router.push({name: 'NotFound404'})
      }
    },


    getGenre() {

        for(const genre of this.movie.genres) {
            this.now_genre.push(this.genre[Number(genre)])
   
            console.log(this.now_genre)
        
            break
        }
      },
      
    


    searchYoutube(){
      this.inputValue = this.movie.title + ' ' + this.searchText
      const params = {
        key: API_KEY,
        part:'snippet',
        type: 'video',
        q: this.inputValue,
      }
      axios({
        method: 'get',
        url: API_URL,
        params,
      })
      .then(res => {
        // console.log(res)
        this.videos = res.data.items
        this.selectedVideo = this.videos[0]
        // console.log(this.videos)
      })
      .catch(err => {
        console.log(err)
      })
    },
    onSelectVideo: function (video) {
      this.selectedVideo = video
      // this.selecteVideo = video
    },
    toggleOnOff: function() {
    this.isStatusOn = !this.isStatusOn;
  },


  refreshMovie(newMovie) {
    this.movie = newMovie
    location.reload()
  }
  },
  created() {
    // console.log(this.$route.params.id) 여기까지 id 잘 들어옴.
    this.getMovieById(this.$route.params.id)
    this.getGenre()
    this.searchYoutube()
  },

  watch: {
    refreshPickMovieCnt() {
      this.getMovieById(this.$route.params.id)
      location.reload()
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Abel&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap');

h1 {
  font-family: 'Abel', sans-serif;
}

div {
  font-family: 'Nanum Gothic', sans-serif;
}

.star-ratings {
  color: #aaa9a9; 
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
  /* -webkit-text-fill-color: transparent;  */
  /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: #2b2a29;
  margin: auto;
  right: 60px;
}
 
.star-ratings-fill {
  color: #fff58c;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
  -webkit-text-fill-color: gold;
}
 
.star-ratings-base {
  z-index: 0;
  padding: 0;
}

.detail-poster-img {
  margin: auto;
}

#detail-img-profile {
  min-width: 530px;
  width: 530px;
  height: 760px;
}

#detail-absoulute {
  position: absolute;
  right: 1%;
  top: 100px;
  border: #9dfffa solid 0.4px;
  border-radius: 10px;
  background: #f16d56;
}

#detail-view-main {
  min-width: 1500px;
}
</style>