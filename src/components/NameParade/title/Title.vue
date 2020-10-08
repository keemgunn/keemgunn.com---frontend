<template>
<div class="title-space" :style="space">

<transition name="titlesign-vanish">
<div v-if="SEQ < 4"
class="block-wrapper" :style="FIELD">
  <div v-for="block in BLOCKS" :key="block">
    <div class="cell" :style="cellStyle">
      <Cell 
        :block="block" 
        :index="BLOCKS.indexOf(block)"
        @mounted='$store.state.np.cellTiming.mounted += 1'
      />
    </div>
  </div>
  <transition name="titlesign-vanish">
    <TitleSign v-if="BLOCK_RENDERED && (SEQ < 2)"/>
  </transition>
</div></transition>

</div>
</template>



<script>
import { mapGetters, mapMutations } from 'vuex';
import Cell from './Cell';
import TitleSign from './TitleSign';
import { timing } from '../../../api/NameParade/animation';
const name = "Title";
export default {
  name,
  components: { Cell, TitleSign },
  computed: {
    ...mapGetters([ 
        'VIEWTYPE', 
        'VW', 'VH',
        'byType', 
        'SEQ',
        'bs',
        'fw',
        'fh',
        'wOff',
        'hOff',
        'BLOCKS',
        'BLOCK_RENDERED',
        'blockCounts',
        'CELL_TIMING',
        'CELL_MOUNTED',
        'TYPO_RENDERED',
      ]),
      AT: function(){
        return timing[name]
      },
    space: function(){
      if(this.SEQ === 3){
        if(this.VIEWTYPE === 'small'){
          return {
            'height': '12vw',
          }
        }else if(this.VIEWTYPE === 'narrow'){
          return {
            'height': '12vh',
          }
        }else if(this.VIEWTYPE === 'tablet'){
          return {
            'height': '20vw',
          }
        }else{
          return { // this.VIEWTYPE === 'wide'
            'height': '20vw',
          }
        }
      }else{
        return {'height': '0vh'}
      }
    },
    FIELD: function(){
      return {
        'width': this.fw +'px',
        'height': this.fh +'px',
        'left': this.wOff +'px',
        'top': this.hOff +'px'
      }
    },
    cellStyle: function(){
      return{
        'width': this.bs +'px',
        'height': this.bs +'px'
      }
    }

  },
  methods: {
    ...mapMutations([
      'moveTo',
    ]),
    onResize(){
      if((this.VIEWTYPE === 'small') || (this.VIEWTYPE === 'narrow')){
        this.$store.state.np.circleAnime.colCount = 7; // 0.5, 6, 0.5
      }else if(this.VIEWTYPE === 'tablet'){
        this.$store.state.np.circleAnime.colCount = 10; // 1.5, 7, 1.5
      }else{
        this.$store.state.np.circleAnime.colCount = 15; // 1.5, 12, 1.5
      }
      this.sizeCalc();
    },
    sizeCalc(){
      if((this.VIEWTYPE === 'small') || (this.VIEWTYPE === 'narrow')){
        this.$store.state.np.circleAnime.blockSize = parseInt(this.VW/(this.blockCounts.c-1));
        this.$store.state.np.circleAnime.rowCount = parseInt(this.VH/this.bs) + 3
      }else{
        this.$store.state.np.circleAnime.blockSize = parseInt(this.VW/(this.blockCounts.c-3));
        this.$store.state.np.circleAnime.rowCount = parseInt(this.VH/this.bs) + 2
      }
      this.$store.state.np.circleAnime.fieldWidth = this.bs * this.blockCounts.c;
      this.$store.state.np.circleAnime.fieldHeight = this.blockCounts.r * this.bs;
      this.$store.state.np.circleAnime.wOff = (this.VW-this.fw)/2;
      this.$store.state.np.circleAnime.hOff = (this.VH-this.fh)/2;
    },
    getBlockArr(){
      this.$store.state.np.blocks = [];
      for(var i=0; i<this.blockCounts.r; i++){
        for(var j=0; j<this.blockCounts.c; j++){
          this.$store.state.np.blocks.push(j + 'x' + i);
        }
      }
      this.$store.state.np.blockRendered = true;
    },
  },
  watch: {
    colCount(nu, old){
      this.getBlockArr();
      return {nu, old}
    },
    rowCount(nu, old){
      this.getBlockArr();
      return {nu, old}
    },
    TYPO_RENDERED(nu, old){
      if(nu){
        this.moveTo(1);
      }
      return old
    }
  },
  mounted() {
    this.onResize();
    this.getBlockArr();
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },
}
</script>



<style lang="scss" scoped> 
.title-space{
  position: relative; top: 0; left: 0;
  width: 100vw; height: 100vh;
  transition: 1000ms;
  transition-timing-function: cubic-bezier(.28,.46,.62,1);
  user-select: none;
  pointer-events: none;
  // background-color: rgba(230, 12, 56, 0.13);
}
.block-wrapper {
  position: fixed; top: 0; left: 0;
  width: 100vw; height: 100vh;
  // background-color: rgba(10, 53, 53, 0.733);
}
.cell {
  position: relative;
  float: left;
}



</style>