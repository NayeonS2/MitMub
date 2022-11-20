<template>
  <div class="list-group-item p-0" @click="selectVideo">
    <img :src="youtubeImageSrc" alt="youtube-thumbnail-image" id="thumbnail-image">
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'YoutubeListItem', 
  props: {
    video: {
      type: Object,
      required: true,
    }
  },
  methods: {
    selectVideo: function () {
      this.$emit('select-video', this.video)
    }
  },
  computed: {
    youtubeImageSrc: function () {
      return this.video.snippet.thumbnails.high.url
    }
  },
  filters: {
    stringUnescape: function (rawText) {
      return _.unescape(rawText)
    }
  }
}
</script>

<style>
.list-group-item {
  cursor: pointer;      /* 마우스를 포인터로 변경 */
  width: 200px;
}

.list-group-item:hover {
  background: #eee;
}

.list-group-item img {
  height: fit-content;   /* 이미지 늘어나지 않게 설정 */
}

#thumbnail-image {
  margin: auto;
  width: 180px;
}
</style>