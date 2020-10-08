<template>
<div id="cell-wrapper">




  <div class="back-circle">
    <svg 
    class="circle"
    viewBox="0 0 52 52" version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink"
    fill="none">
      <path 
        class="circle-closed"
        d="M25,50 C38.7588836,50 49.921346,37.5921381 50,25 C49.8815138,10.7809603 38.6242322,0 25,0 C11.1928813,0 0,11.1928813 0,25 C0,38.8071187 11.1928813,50 25,50 Z"
        fill-rule="evenodd"
        transform="translate(1.000000, 1.000000)"
        stroke-width="1">
      </path>
    </svg>
  </div>

  <div class="index-marker">
    {{index}}
  </div>
</div>
</template>



<script>
import{ mapState, mapGetters, mapMutations } from 'vuex';
import anime from 'animejs';


const name ="Cell";
export default {
  name,
  components: { },
  props: [
    'block', 'index', 'allMounted'
  ],
  data() { return {
    coord: [],
    CT: null,



  }},
  computed: {
    ...mapState([]),
    ...mapGetters([]),


  },
  watch: {
    allMounted(nu, old){
      console.log(nu);
      this.CT.play();
      return old
    }
  },
  methods: {
    ...mapMutations([]),

    
  },
  created() {
    this.coord = [this.block[1],this.block[2]]
  },
  mounted() {
    const {
      Timeline,
      keys,
      backCircleDashOff,
    } = require('../../assets/javascripts/circleAnime');


    this.CT = Timeline();
    // const delayOffset = this.index*300;

    this.CT.add({
      targets: '.circle-closed',
      strokeDashoffset: backCircleDashOff, 
      // delay: delayOffset,
      duration: 1500,
      endDelay: 0,
      direction: 'normal',
      easing: "easeInOutSine",
    }).add({
      targets: '.circle-closed',
      stroke: [
        keys('#ffffff', 1000, 1000, 0)
      ],
      easing: "easeOutExpo"
    }).add({
      targets: '.circle-closed',
      stroke: [
        { value:'#00ff00' , delay:500 , duration: 2000 },
      ],
      easing: "easeOutExpo"
    })


    this.$emit('mounted', this.index);
  },
  beforeUpdate() {
    
  },
  beforeCreate() {
    
  },
}
</script>



<style lang="scss" scoped> 
#cell-wrapper{
  position: relative;
  top: 10%; left: 10%;
  width: 80%; height: 80%;
  // color: dimgray;
  // background-color: skyblue;
}

.back-circle{
  position: absolute;
  width: 100%; height: 100%;
  // background-color: aqua;
}

.circle-closed{
  stroke-dasharray: 160;
  stroke-dashoffset: 160;
  stroke: rgba(96, 120, 199, 0.438);
}

.index-marker{
  position: absolute;
  top: -6%; right: -6%;
  font-size: 13px;
  font-family: sans-serif;
}




</style>