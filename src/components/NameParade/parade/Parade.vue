<template>
<div class="parade-wrapper">

  <div class="top-space" :style="topSpace"></div>
  <div class="title-wrapper" :style="title">
    <div v-for="block in titleBlocks" :key="block">
      <div class="cell" :style="cellStyle">
        <TitleCell 
          :index="block" 
          @mounted='titleCellMounted'
        />
      </div>
    </div>
  </div>

  <div class="content-wrapper" :style="contentStyle">

    <div v-if="displayOn && signDataLoaded"
      class="display-wrapper" :style="displayStyle">
      <Display/>
    </div>

    <transition name="contributor"> 
    <div v-if="displayOn && signDataLoaded" 
      class="contributor-wrapper" :style="contributorStyle">
      <Contributor/>
    </div>
    </transition>

  </div>

</div>
</template>



<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import TitleCell from './TitleCell';
import Display from './Display';
import Contributor from './Contributor';
export default {
  name: "Parade",
  components: { TitleCell, Display, Contributor,  },
  data() { return {
    topSpace: {
      height: "0px",
    },
    title: {
      left: "0px", width: "0px", height: "0px"
    },
    contentStyle:{
      left: "0px", width: "0px"
    },
    displaySize: {
      small: 5, narrow: 5, tablet: 6, wide: 5
    },
    blockCount: 0,
    titleBlocks: [],
    displayOn: false,
  }},

  computed: {
    ...mapState([ 'signDataLoaded', 'circleAnime', 'blocks' ]),
    ...mapGetters([ 'VIEWTYPE', 'bs', ]),

    gridType: function(){
      if((this.VIEWTYPE === 'small')||(this.VIEWTYPE === 'narrow')){
        return {
          index: 15, xAdd: 0, yAdd: 0,
          wCount: 5, hCount: 5
        }
      }else if(this.VIEWTYPE === 'tablet'){
        return {
          index: 12, xAdd: 0, yAdd: 0,
          wCount: 6, hCount: 5
        }
      }else{
        return {
          index: 32, xAdd: 0, yAdd: 0,
          wCount: 11, hCount: 3
        }
      }
    },
    cellStyle: function(){
      return{
        'width': this.bs +'px',
        'height': this.bs +'px'
      }
    },
    GSstyle: function(){
      if((this.VIEWTYPE === 'small')||(this.VIEWTYPE === 'narrow')){
        return {
          'top': '4vw', 'left': '4vw',
          'width': '70vw', 'height': '35vw'
        }
      }else if(this.VIEWTYPE === 'tablet'){
        return {
          'top': '2vw', 'left': '2vw',
          'width': '60vw', 'height': '30vw'
        }
      }else{
        return {
          'top': '10vw', 'left': '7vw',
          'width': '44vw', 'height': '22vw'
        }
      }
    },
    contentSize: function(){
      if((this.VIEWTYPE === 'small')||(this.VIEWTYPE === 'narrow')){
        return {
          column: 5
        }
      }else if(this.VIEWTYPE === 'tablet'){
        return {
          column: 6
        }
      }else{
        return {
          column: 11
        }
      }
    },
    displayStyle: function(){
      if(this.VIEWTYPE === 'wide'){
        return {
          position: 'absolute',
          width: this.displaySize[this.VIEWTYPE] * this.bs + 'px',
          height: (this.displaySize[this.VIEWTYPE]-1) * this.bs + 'px',
        }
      }else{
        return {
          width: this.displaySize[this.VIEWTYPE] * this.bs + 'px',
          height: (this.displaySize[this.VIEWTYPE]-1) * this.bs + 'px',
        }
      }
    },
    contributorStyle: function(){
      if((this.VIEWTYPE === 'small')||(this.VIEWTYPE === 'narrow')){
        return {
          left: this.bs * (-0.46) +'px',
          width: '98vw'
        }
      }else if(this.VIEWTYPE === 'tablet'){
        return {

        }
      }else{
        return {
          position: 'absolute', 
          left: this.bs * 5 +'px',
          'margin-top': '0',
          width: this.bs * 6 +'px', 
          height: this.bs * 4 +'px',
          'overflow-x': 'hidden',
          'overflow-y': 'auto',
          'margin-bottom': '0',
          'padding-bottom': '0'
        }
      }
    },
  },
  methods: {
    ...mapMutations([
      'bbcTrigger'
    ]),
    getGridHeight(blocks, circleAnime, {index, xAdd, yAdd, wCount, hCount}){
      let coords = blocks[index].split('x');
      let column = parseInt(coords[0]);
      let row = parseInt(coords[1]);
      let left = (column+xAdd)*circleAnime.blockSize + this.circleAnime.wOff +'px';
      let top = (row+yAdd)*circleAnime.blockSize + this.circleAnime.hOff +'px';
      let width = wCount*circleAnime.blockSize +'px';
      let height = hCount*circleAnime.blockSize +'px';
      return { left, top, width, height }
    },
    titleCellMounted(){
      this.$store.state.cellTiming.paradeTitleMounted += 1;
    },
    triggerDisplay(){
      this.displayOn = true;
    }
  },
  created() {
    let { left, top, width, height } = this.getGridHeight(this.blocks, this.circleAnime, this.gridType);
    this.topSpace.height = top;
    this.title.left = left;
    this.title.width = width;
    this.title.height = height;
    this.contentStyle.left = left;
    this.contentStyle.width = this.bs * this.contentSize.column +'px';
    this.blockCount = this.gridType.wCount * this.gridType.hCount;
    for(var i=0; i < this.blockCount; i++){
      this.titleBlocks.push(i);
    }
    this.$store.state.cellTiming.paradeTitleCellCount = this.titleBlocks.length;
    this.titleBlocks;
  },
  mounted() {
    this.bbcTrigger(false);
    setTimeout(this.triggerDisplay, 3500, true);
  },
  beforeUpdate() {
    
  },
  beforeCreate() {
    
  },
}
</script>



<style lang="scss" scoped> 
.parade-wrapper{
  position: relative;
  width: 100%; height: fit-content;
  // background-color: rgba(127, 255, 212, 0.349);
}
.top-space{
  position: relative;
  width: 100%;
  // background-color: rgba(0, 17, 255, 0.288);
}
.title-wrapper{
  position: relative; top: 0;
  // background-color: rgba(207, 35, 35, 0.322);
}
.cell {
  position: relative;
  float: left;
}
.graphic-sign-wrapper{
  position: absolute; 
  // background-color: rgba(20, 255, 224, 0.452);
}
.content-wrapper{
  position: relative; 
  top: 0;
  height: fit-content;
  margin-top: 5vh;
  // background-color: rgba(231, 211, 33, 0.219);
}
.display-wrapper{
  position: relative;
  top: 0; left: 0;
  // background-color: rgba(0, 0, 139, 0.384);
}
.contributor-wrapper{
  position: relative;
  top: 0; left: 0;
  margin-top: 2%;
  width: 100%; height: fit-content;
  overflow: hidden;
  // padding-bottom: 10vw;
}







</style>