<template>
    <div id="youtubeId" v-if="video" class="video-detail">
      <div class="video-container">
        <iframe :src="videoURI" frameborder="0" width="854" height="480"></iframe> 
      </div>
    </div>
  </template>
  
  <script>
  import _ from 'lodash'
  
  export default {
    name: 'YoutubeDetail', 
    props: {
      video: {
        type: Object,
      }
    },
    computed: {
      videoURI: function () {
        const videoId = this.video.id.videoId
        return `https://www.youtube-nocookie.com/embed/${videoId}`
      }
    },
    filters: {
      stringUnescape: function (rawText) {
        return _.unescape(rawText)
      }
    },
  }
  </script>
  
  <style>
  #youtubeId {
    margin: auto;
  }

  .video-detail {
    width: 70%;           /* Detail, List를 전체 가로 비율 대비 7:3으로 설정 */
    padding-right: 1rem;  /* Detail과 List 사이의 margin */
  }
  
  .video-container {
    position: relative;   /* iframe을 container를 기준으로 위치를 지정 */
    padding-top: 56.25%;  /* 유튜브 비디오 비율을 맞추기 위한 높이 설정 */
  }
  
  .video-container > iframe {
    position: absolute;   /* container를 기준으로 위치를 지정*/
    top: 0;               /* container의 가장 위쪽으로 위치를 지정 */
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  </style>