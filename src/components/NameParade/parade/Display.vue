<template>
<div id="display">
  <div id="border-box">
    <svg 
    viewBox="-4 -4 508 408" 
    version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    fill="none">
      <rect id="border" stroke-width="3" x="0" y="0" width="500" height="400"></rect>
    </svg>
  </div>
  <div id="content">
    <PathView
    v-if="viewOn" 
    :pathData="pathData"
    />
  </div>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import PathView from './PathView';
import anime from 'animejs';
const { keys, Timeline } = require('../../../assets/NameParade/javascripts/circleAnime');
const { randomInt } = require('../../../assets/NameParade/javascripts/uiAction');
const { signFiles } = require('../../../test/test');

export default {
  name: "Display",
  components: { PathView },
  data() { return {
    BorderIn: null, BorderOut: null,
    pathData: [],
    viewOn: false,
    signSeq: [],
    pending: []
  }},
  
  computed: {
    ...mapState(['renderStatus']),
    ...mapGetters(['SIGNS','SIGNS_COUNT']),

    SIGN_SEQ_ARR: function(){
      return this.signSeq.length
    }

  },
  watch: {

    renderStatus(nu, old){
      if(nu === 1){//___when render starts
        this.aIn();
        this.pending = this.PULL(this.SIGNS);
      }else if(nu === 2){//___when rendered
        this.aOut();
      }else if(nu ===3){//___when destroyed
        this.viewOn = false;
        setTimeout(this.MOUNT, 400, this.pending);
        this.$store.state.renderStatus = 0;
      }
        return old
    },

    SIGN_SEQ_ARR(nu, old){
      if(nu === 1){
        this.refreshSignSeq(this.SIGNS_COUNT);
      }else{
        return old
      }
    },

  },
  methods: {

    aIn(){
      this.BorderIn = null;
      this.BorderOut = null;
      this.BorderIn =  Timeline(anime)
      .add({
        targets: '#border',
        stroke: [
          keys('rgba(255, 255, 255, 0)', 0, 1, 0, "easeOutExpo"),
          keys('rgba(255, 255, 255, 1)', 0, 800, 1000, "easeOutExpo")
        ],
      });
      this.BorderIn.play();
    },

    aOut(){
      this.BorderOut = Timeline(anime)
      .add({
      targets: '#border',
      strokeDashoffset: [{
          value: [0, anime.setDashoffset], 
          delay: 1800,
          duration: 3500, // HOW LONG WOULD BE THE PATH DISPLAYED
          endDelay: 0,
          direction: 'normal',
          easing: "easeInOutQuart",
        }],
      })
      .add({
        targets: '#border',
        stroke: [
          keys('rgba(255, 255, 255, 0)', 0, 1, 0, "easeOutExpo")
        ],
      })
      .add({
      targets: '#border',
      strokeDashoffset: [{
          value: [anime.setDashoffset, 0], 
          delay: 0,
          duration: 1,
          endDelay: 0,
          direction: 'normal',
          easing: "easeInOutQuart",
        }],
      });
      this.BorderOut.finished.then(() => {
        this.$store.state.renderStatus += 1;
        anime.remove('#border');
      });
      this.BorderOut.play();
    },

    refreshSignSeq(count){
      let counter = [];
      for(var j=0; j < count; j++){
        counter[j] = j;
      }
      let result = [];
      for(var i=0; i < count; i++){
        let now = randomInt(0, counter.length);
        result.push(counter[now]);
        counter.splice(now, 1);
      }
      this.signSeq = result;
    },

    PULL(arr){
      const num = this.signSeq.pop();
      return arr[num]
    },

    MOUNT(data){
      this.pathData = null;
      this.pathData = data;
      this.viewOn = true;
    }

  },

  mounted() {
    if(this.$store.state.test.server.signLoad){
      this.$store.state.signsArr = signFiles.sort(() => {
        return Math.random() - Math.random();
      });
    }
    this.refreshSignSeq(this.SIGNS_COUNT);
    this.pending = this.PULL(this.SIGNS);
        // ________ SET DELAY BEFOR RENDER SIGNS ________
    setTimeout(this.MOUNT, 2000, this.pending);
    this.$store.state.backBlue = false;
  },

  beforeDestroy() {
    anime.remove('#border');
    this.BorderIn = null;
    this.BorderOut = null;
  },
}
</script>


<style lang="scss" scoped> 
#display{
  position: absolute;
  top: 1%; left: 0%;
  width: 100%; height: 98%;
}
#border-box{
  position: absolute;
  pointer-events: none;
  // top: 1%; left: 1%;
  width: 100%; height: 100%;
  // stroke: rgba(255, 255, 255, 0);
}
</style>