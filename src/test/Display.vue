<template>
<div id="display" @click="renderStatusTest()">
  <div id="border-box">
    <svg 
    viewBox="0 0 710 710" 
    version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    fill="none">
      <rect id="border" stroke-width="1.5" x="0.6" y="0.6" width="708.8" height="708.8"></rect>
    </svg>
  </div>
</div>
</template>


<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import anime from 'animejs';
const { keys, Timeline } = require('../../assets/javascripts/circleAnime');

export default {
  name: "Display",
  components: { },
  props: [

  ],
  data() { return {
    BorderIn: null,
    BorderOut: null,
  }},
  computed: {
    ...mapState([
      'renderStatus'
    ]),
    ...mapGetters([

    ]),


  },
  watch: {
    renderStatus(nu, old){
      if(nu === 1){
        this.aIn();
      }else if(nu === 2){
        this.aOut();
        this.$store.state.renderStatus = 0;
      }
      return old
    }
  },
  methods: {
    ...mapMutations([]),
    aIn(){
      // this.BorderIn = null;
      // this.BorderOut = null;
      this.BorderIn.play();
    },
    aOut(){
      this.BorderOut.play();
    },
    renderStatusTest(){
      this.$store.state.renderStatus += 1;
    }
  },
  created() {


  },
  mounted() {

    this.BorderIn =  Timeline(anime)
    .add({
      targets: '#border',
      stroke: [
        keys('rgba(255, 255, 255, 0)', 0, 1, 0, "easeOutExpo"),
        keys('rgba(255, 255, 255, 1)', 0, 800, 1000, "easeOutExpo")
      ],
    });

    this.BorderOut = Timeline(anime)
    .add({
      targets: '#border',
      stroke: [
        keys('rgba(255, 255, 255, 1)', 0, 1, 0, "easeOutExpo")
      ],
      strokeDashoffset: [{
        value: [0, anime.setDashoffset], 
        delay: 0,
        duration: 3200,
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
        value: [0, 0], 
        delay: 0,
        duration: 1,
        endDelay: 0,
        direction: 'normal',
        easing: "easeInOutQuart",
      }],
    })
    


  },
  beforeUpdate() {
    
  },
  beforeCreate() {
    
  },
}
</script>



<style lang="scss" scoped> 
#display{
  position: absolute;
  top: 1%; left: 1%;
  width: 98%; height: 98%;
}
#border-box{
  position: absolute;
  pointer-events: none;
  width: 100%; height: 100%;
  // stroke: rgba(255, 255, 255, 0);
}




</style>