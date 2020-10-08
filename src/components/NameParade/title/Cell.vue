<template>
<div id="cell-wrapper">

  <div class="back-circle">
    <svg 
    :id="reacter"
    viewBox="0 0 52 52" version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink"
    fill="none">
      <path 
        class="circle"
        :id="circleId"
        d="M25,50 C38.7588836,50 49.921346,37.5921381 50,25 C49.8815138,10.7809603 38.6242322,0 25,0 C11.1928813,0 0,11.1928813 0,25 C0,38.8071187 11.1928813,50 25,50 Z"
        fill-rule="evenodd"
        transform="translate(1.000000, 1.000000)"
        stroke-width="1">
      </path>
    </svg>
  </div>

  <transition name="title-typo">
  <div v-if="SEQ<4">
  <div class="circle-typo" v-if="(typoAlternater)&&(SEQ<4)">
    <svg 
    :id="reacter"
    viewBox="0 0 52 52" version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink"
    fill="none">
      <path 
        class="typo"
        :id="typoId"
        d=""
        fill-rule="evenodd"
        transform="translate(1.000000, 1.000000)"
        stroke-width="1.4">
      </path>
    </svg>
  </div>
  <div class="circle-typo" v-if="(!typoAlternater)&&(SEQ<4)">
    <svg 
    :id="reacter"
    viewBox="0 0 52 52" version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink"
    fill="none">
      <path 
        class="typo"
        :id="typoId"
        d=""
        fill-rule="evenodd"
        transform="translate(1.000000, 1.000000)"
        stroke-width="1.4">
      </path>
    </svg>
  </div>
  </div>
  </transition>

  <div class="index-marker" v-if="0">
    {{index}}
  </div>
</div>
</template>



<script>
import{ mapState, mapGetters, mapMutations } from 'vuex';
import anime from 'animejs';
const {
  Timeline,
  keys,
  positionMap,
  mountPosition,
  typoArr,
  pathReaction,
} = require('../../../assets/NameParade/javascripts/circleAnime');

export default {
  name: "Cell",
  props: [ 'block', 'index' ],
  data() { return {
    coord: [],
    typoIndex: -1,
    typoEl: null,
    typoAlternater: true,
    CircleAnimation: null,
    TypoAnimation: null,
    TypoRerender: null,
    CircleLoop: null,
    pathFadeTrigger: -1,
    TypoReact_fadeout: null,
    TypoReact_fadein: null,
  }},
  computed: {
    ...mapState([
      'aniTiming'
    ]),
    ...mapGetters([
      'VIEWTYPE',
      'SEQ',
      'CELL_MOUNTED',
      'NEW_PATHS'
    ]),
    mpType: function(){
      return positionMap[this.SEQ] // === number
    },
    circleId:function(){
      return 'circle'+this.index
    },
    typoId:function(){
      return 'typo'+this.typoIndex
    },
    reacter: function(){
      return 'react_'+this.index
    }

  },
  watch: {

    CELL_MOUNTED(nu, old){
      this.CircleAnimation.play();
      return old
    },

    SEQ(nu, old){
      if(nu === 2){
        //____________________________________CircleAnimation
        this.CircleAnimation = null;
        this.CircleAnimation = Timeline(anime)
        .add({ targets: '#'+this.circleId,
          stroke: [
            keys('rgba(255, 255, 255, 0)', 0, 300, 0, "easeOutExpo")
          ]
        });
        this.CircleAnimation.play();
        //_____________________________________TypoRerender
        this.TypoRerender = null;
        this.TypoRerender = Timeline(anime)
        .add({ targets: '#'+this.typoId,
          strokeDashoffset: [
            {
              value: [0, anime.setDashoffset], 
              delay: 0,
              duration: 1800,
              endDelay: 300,
              direction: 'normal',
              easing: "easeOutQuad",
            }
          ],
        });
        this.TypoRerender.finished.then(() => {
          this.typoAlternater = !this.typoAlternater;
          this.typoRelocate();
        });
        this.TypoRerender.play();
      }else if(nu === 4){
        this.CircleAnimation = null;
        this.TypoAnimation = null;
        anime.remove("#" + this.circleId);
        this.CircleLoop = null;
      }
      return old
    },

    NEW_PATHS(nu, old){
      if(this.pathFadeTrigger !== -1){
        if(nu === 1){
          this.TypoReact_fadeout.play();
        }else if(nu === 0){
          this.TypoReact_fadein.play();
        }
      }return old
    }

  },
  methods: {
    ...mapMutations([]),
    //__________________RERENDER METHODS________
    typoRelocate(){
      this.typoIndex = mountPosition[this.mpType][this.VIEWTYPE].indexOf(this.index);
      if(this.typoIndex !== -1){
        setTimeout(this.setPath, 100);
      }else{
        this.afterRerender();
      }
    },setPath(){
      this.typoEl = document.querySelector('#'+this.typoId);
      this.typoEl.setAttribute("d", typoArr[this.typoIndex]);
      setTimeout(this.reRender, 100);
    },
    reRender(){
      this.TypoRerender = null;
      this.TypoRerender = Timeline(anime)
      .add({ targets: '#' + this.typoId,
        stroke: [
          keys('#ffffff', 20, 400, 0, "easeOutExpo"),
        ],
        strokeDashoffset: [
          {
            value: [anime.setDashoffset, 0], 
            delay: function() { return anime.random(0, 700); },
            duration: function() { return anime.random(1000, 2000); },
            endDelay: 0,
            direction: 'normal',
            easing: "easeOutQuad",
          }
        ],
      });
      this.TypoRerender.finished.then(() => {
        this.afterRerender();
      });
      this.TypoRerender.play();
      this.pathFadeTrigger = pathReaction[this.VIEWTYPE].indexOf(this.index);
      if(this.SEQ === 2){
        if(this.pathFadeTrigger!==-1){
          this.TypoReact_fadeout = null;
          this.TypoReact_fadeout = Timeline(anime)
          .add({ targets: '#' + this.typoId, 
            stroke: [
              keys('rgba(255, 255, 255, 0)', 0, 1000, 0, "easeOutCubic")
            ]
          });
          this.TypoReact_fadein = null;
          this.TypoReact_fadein = Timeline(anime)
          .add({ targets: '#' + this.typoId, 
            stroke: [
              keys('#ffffff', 0, 600, 0, "easeInQuart")
            ]
          });
        }
      }
    },
    afterRerender(){
      if(this.SEQ ===2){ 
        this.CircleLoop.play();
      }
    },
  },
  created() {
    this.coord = [this.block[1],this.block[2]]
    if(this.SEQ < 4){
      this.typoIndex = mountPosition[this.mpType][this.VIEWTYPE].indexOf(this.index);
    }
  },
  mounted() {
    const delayOffset = this.index * 40;
    // ____________ INSERT TYPOGRAPHIES
    if(this.typoIndex !== -1){
      this.typoEl = document.querySelector('#'+this.typoId);
      this.typoEl.setAttribute("d", typoArr[this.typoIndex]);
    }

  
    // _________________________ BACKCIRCLE ANIMATION
    const CircleAnimation = Timeline(anime)
    .add({ targets: "#" + this.circleId,
      stroke: [
        keys('#2C2A6A', delayOffset, 1000, 0, "easeOutExpo")
        ],
      strokeDashoffset: [
        {
          value: [anime.setDashoffset, 0], 
          delay: delayOffset,
          duration: 1000,
          endDelay: 0,
          direction: 'normal',
          easing: "easeOutQuad",
        }
      ]
    })
    .add({ targets: "#" + this.circleId,
      stroke: [
        keys('#ffffff', 0, 300, 0, "easeOutExpo"),
        keys('#3C3B57', 0, 1000, 0, "easeOutExpo")
      ],
      complete: function() {
        trigger('TypoAnimation');
      }
    }).add({ targets: "#" + this.circleId,
      stroke: [
        keys('rgba(38, 0, 255, 0.14)', 0, 5000, 0, "easeOutCubic")
      ]
    })


    // _________________________ TYPO ANIMATION
    const TypoAnimation = Timeline(anime)
    .add({ targets: '#'+this.typoId,
      stroke: [
        keys('#ffffff', 0, 200, 0, "easeOutExpo"),
        keys('rgba(255, 255, 255, 0.56)', 5000, 2600, 0, "easeOutExpo"),
        ],
      strokeDashoffset: [
        {
          value: [anime.setDashoffset, 0], 
          delay: function() { return anime.random(200, 1000); },
          duration: function() { return anime.random(3800, 5000); },
          endDelay: 0,
          direction: 'alternate',
          easing: "easeInOutQuart",
        }
      ],
      delay: 400
    })
    TypoAnimation.finished.then(() => {
      this.$store.state.cellTiming.typoRendered += 1;
    });


    // _________________________ LOOP ANIMATION
    this.CircleLoop = null;
    this.CircleLoop = anime.timeline({
      autoplay: false,
      loop: true,
      direction: 'normal',
      delay: function() {return anime.random(0, 15000)}
    })
    .add({ targets: "#" + this.circleId,
      stroke: [
        keys('rgba(255, 255, 255, 0)', 
          function() { return anime.random(0, 2000); },
          2, 50, "easeOutCubic"),
        keys('rgba(255, 255, 255, 0.3)', 0, 100, 0, "easeOutSine"),
        keys('rgba(255, 255, 255, 0)', 0, 4000, 50, "easeOutCubic"),
      ],
    });

    const conditions = {
      TypoAnimation: (this.typoIndex !== -1),
    }
    function trigger(target){
      if(conditions[target]){
        play(target);
      }
    }
    function play(target){
      if(target === 'TypoAnimation'){
        TypoAnimation.play();
      }
    }
    this.CircleAnimation = CircleAnimation;
    this.$emit('mounted', this.index);
  }
}
</script>
<style lang="scss" scoped> 
#cell-wrapper{
  position: relative;
  top: 6%; left: 6%;
  width: 88%; height: 88%;
}
.back-circle{
  position: absolute;
  width: 100%; height: 100%;
}
.circle{
  stroke: #00000000;
}
.circle-typo{
  position: absolute;
  width: 100%; height: 100%;
}
.typo{
  stroke :rgba(255, 255, 255, 0.315);
  stroke :rgba(255, 255, 255, 0);
}

.index-marker{
  position: absolute;
  top: -6%; right: -6%;
  font-size: 13px;
  font-family: sans-serif;
}
</style>