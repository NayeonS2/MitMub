<template>
  <div class="p-0 m-0">
    <div id="list-item-div" class="d-flex justify-content-center">
      <YoutubeListItem 
        v-for="video in videos.slice(0,5)" 
        :key="video.id.videoId" 
        :video="video" 
        @select-video="onSelectVideo"
      />
    </div>
  </div>
  </template>
  
  <script>
  import YoutubeListItem from '@/components/YoutubeListItem'
  
  export default {
    name: 'YoutubeList',
    components: {
      YoutubeListItem,
    },
    props: {
      videos: {
        type: Array,
        required: true,
      }
    },
    methods: {
      onSelectVideo: function (video) {
        // console.log(video)
        this.$emit('select-video', video)
      }
    }
  }
  </script>
  
  <style>

  </style>