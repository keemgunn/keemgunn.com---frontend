<template>
<div id="not-found">

  <vue-blotter family="'Montserrat', sans-serif"
    :padding = "0" :fill="cccc"
    :size="VW* 0.248"
    material-type="LiquidDistortMaterial"
    text="THERES"
    :uniforms="{ uSpeed: 0.1 }"
  ><h1 class="theres" :style="blotterOp"></h1></vue-blotter>

  <vue-blotter family="'Montserrat', sans-serif"
    :padding = "0" fill="#0000ff"
    :size="VW* 0.205"
    material-type="LiquidDistortMaterial"
    text="NOTHING"
    :uniforms="{ uSpeed: 0.13 }"
  ><h1 class="nothing" :style="blotterOp"></h1></vue-blotter>

  <vue-blotter family="'Montserrat', sans-serif"
    :padding = "0" fill="#0000ff"
    :size="VW* 0.256"
    material-type="LiquidDistortMaterial"
    text="IN HERE"
    :uniforms="{ uSpeed: 0.09 }"
  ><h1 class="inhere" :style="blotterOp"></h1></vue-blotter>

  <vue-blotter family="'Montserrat', sans-serif"
    :padding = "0" fill="#0000ff"
    :size="VW* 0.1"
    material-type="LiquidDistortMaterial"
    text="NAMEPARADE2020"
    :uniforms="{ uSpeed: 0.07 }"
  ><h1 class="np2020" :style="np2020_Op"></h1></vue-blotter>

  <div id="message">
    <div id="title">go to ...</div>
    <div id="endpoints">
      <a href="http://www.keemgunn.com/nameparade"
      @mousemove="mouseLinkIn"
      @mouseleave="mouseLinkOut">
      /nameparade</a>
    </div>
  </div>
</div>
</template>


<script>
import{ mapState, mapGetters, mapMutations} from 'vuex';
import VueBlotter from "vue-blotter";

export default {
  name: 'NotFound',
  title: "NOT FOUND",
  components: { VueBlotter },
  props: [

  ],
  data() { return {
    cccc: "rgba(0, 0, 255, 1)",
    blotterOpacity: 1,
    np2020_Opacity: 0,

  }},
  computed: {
    ...mapState([]),
    ...mapGetters(['VW', 'VH']),
    blotterOp: function(){
      return {
        'transition': "500ms",
        'opacity': this.blotterOpacity
      }
    },
    np2020_Op: function(){
      return {
        'transition': "300ms",
        'opacity': this.np2020_Opacity
      }
    },
  },
  methods: {
    ...mapMutations([]),
    mouseLinkIn(){
      this.blotterOpacity = 0;
      this.np2020_Opacity = 1;
    },
    mouseLinkOut(){
      this.blotterOpacity = 1;
      this.np2020_Opacity = 0;
    }

  },
  created() {

  },
  mounted() {

  },
  beforeUpdate() {
    
  },
  beforeCreate() {
    
  },
}
</script>



<style lang="scss" scoped> 
#not-found{
  padding: 0;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  color: blue;
  h1 {
    display: block; 
    position: absolute;
    width: 100vw;
    padding: 0;
    margin: 0;
  }
  .theres{
    top: 15vh; left: 0;
    text-align: center;
    // fill: rgba(132, 0, 255, 0.801);
  }
  .nothing{
    top: 28vh; left: 0;
    text-align: center;
  }
  .inhere{
    top: 38vh; left: 0;
    text-align: center;
  }
  .np2020{
    top: 31vh; left: 0;
    text-align: center;
  }
}
#message{
  position: absolute; top: 60vh; left: 0;
  width: 100vw; height: fit-content;
  text-align: center;
  #title{
    font-size: 4.3vw;
    margin-bottom: 1vw;
  }
  #endpoints{
    font-size: 5.3vw;
    letter-spacing: 0.1vw;
    a{
      color: blue;
      transition: 500ms;
    }
    a:hover{
      color: rgb(0, 81, 255);
      transition: 180ms;
    }
    a:active{
      color: rgb(0, 81, 255);
      transition: 180ms;
    }
    a:visited{
      color: blue;
      transition: 180ms;
    }
    a:visited:hover{
      color: rgb(0, 81, 255);
      transition: 180ms;
    }
  }
}




</style>