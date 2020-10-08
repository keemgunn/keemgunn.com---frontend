<template>
<div id="title-cell-wrapper">
  <div class="circle-typo">
    <svg 
    viewBox="0 0 52 52" version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink"
    fill="none">
      <path 
        class="typo"
        :id="titleTypo"
        d=""
        fill-rule="evenodd"
        transform="translate(1.000000, 1.000000)"
        stroke-width="1.4">
      </path>
    </svg>
  </div>
  <div class="index-marker" v-if="0">
    {{index}}
  </div>
</div>
</template>
<script>
import{ mapGetters } from 'vuex';
const { 
  mountPosition, 
  typoArr, 
  Timeline, 
  keys 
} = require('../../../assets/NameParade/javascripts/circleAnime');
import anime from 'animejs';
export default {
  name: "TitleCell",
  props: [
    'index'
  ],
  data() { return {
    typoPositions: null,
    typoIndex: -1,
    typoEl: null,
    MountAnimation: null,
  }},
  computed: {
    ...mapGetters([
      'VIEWTYPE',
      'PARADE_TITLE_MOUNTED',
    ]),
    titleTypo:function(){
      return 'title-typo-'+this.typoIndex
    },
    reacter: function(){
      return 'react_'+this.index
    }
  },
  watch: {
    PARADE_TITLE_MOUNTED(nu, old){
      console.log('true!');
      this.MountAnimation.play();
      return old
    }
  },
  methods: {
    startAnimation(idSource){
      let id = '#'+ idSource;
      this.MountAnimation = Timeline(anime);
      this.MountAnimation.add({ targets: id,
        stroke: [
          keys('rgba(255, 255, 255, 0)', 0, 1, 0, "easeOutCubic"),
          keys('rgba(255, 255, 255, 0.76)', 1, 2, 0, "easeOutCubic")
        ],
        strokeDashoffset: [
          {
            value: [anime.setDashoffset, 0], 
            delay: 1000 + function() { return anime.random(200, 1000); },
            duration: function() { return anime.random(3800, 5000); },
            endDelay: 0,
            direction: 'alternate',
            easing: "easeInOutQuart",
          }
        ],
        delay: 400
      });
      this.MountAnimation.play();
    },
  },
  created() {
    this.typoPositions = mountPosition[2][this.VIEWTYPE];
    this.typoIndex = this.typoPositions.indexOf(this.index);
  },
  mounted() {
    if(this.typoIndex !== -1){
      this.typoEl = document.querySelector('#'+this.titleTypo);
      this.typoEl.setAttribute("d", typoArr[this.typoIndex]);
    }
    setTimeout(this.startAnimation, 200 , this.titleTypo )
  },
}
</script>
<style lang="scss" scoped> 
#title-cell-wrapper{
  position: relative;
  top: 6%; left: 6%;
  width: 88%; height: 88%;
}
.circle-typo{
  position: absolute;
  width: 100%; height: 100%;
}
.index-marker{
  position: absolute;
  top: -3%; right: -3%;
  font-size: 13px;
  font-family: sans-serif;
}
.typo{
  stroke :rgba(255, 255, 255, 0);
}
</style>