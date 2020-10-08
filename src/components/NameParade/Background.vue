<template>
<div id="background">
  {{VIEWTYPE}}
  <div id="bg-loading" :style="bgLoading"></div>
  <canvas id="BG"></canvas>
</div>
</template>


<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
const paper = require('paper');
import { random } from '../../assets/NameParade/javascripts/uiAction';
import { bbc } from '../../assets/NameParade/javascripts/uiAction';
const name = 'Background';
export default {
  name,
  data() { return {
    scope: null,
    h: [], // [a, b, c, d, e, f]
    hueVector: [], // -1 , 0, 1
    l: [0, 0], // [start, end]
    desLev: [ 42 , 38 ],
    size: 0.66, amount: 6,
    AT: {
      loadingTransition: 300 +'ms',
      loadedTransition: 400 + 'ms',
      fadeBlackTransition: 800 +'ms',
      circleVelocity: 0.4,
      levelVelocity: 0.1,
    }
  }},
  computed: {
    ...mapState([
        'bbcAppear',
        'backBlue',
        'winSize',
        'desColor'
      ]),
    ...mapGetters([
        'VIEWTYPE', 
        'NEW_PATHS',
        'SEQ'
      ]),
    bgLoading: function(){
      if(this.backBlue){
        if(this.bbcAppear){
          return {
            'transition': this.AT.fadeBlackTransition,
            'background-color': 'black',
            'opacity': '100%'
          }
        }else{
          return {
            'transition': this.AT.loadedTransition,
            'opacity': '100%'
          }
        }
      }else{
        return {
          'transition': this.AT.loadedTransition,
          'background-color': 'black',
          'opacity': '100%'
        }
      }
    },
    radius: function() {
      if(this.winSize.vw > this.winSize.vh){
        return {
          min: this.winSize.vh * this.size,
          max: this.winSize.vw * this.size
        }
      }else{
        return {
          min: this.winSize.vw * this.size,
          max: this.winSize.vh * this.size
        }
      }
    },
    hueVelocity: function(){
      if(this.SEQ > 3){
        return 1
      }else{
        return 0.5
      }
    }
  },
  methods: {
    ...mapMutations(['setBBC', 'bbcTrigger']),
    onResize() {
      this.scope.view.viewSize.width = window.innerWidth;
      this.scope.view.viewSize.height = window.innerHeight;
    },
    moveCircles(circle, i){
      circle.position.x += circle.data.veloX
      circle.position.y += circle.data.veloY
      //__ bounce X
      if((circle.position.x<0)||(circle.position.x>this.winSize.vw)){
        circle.data.veloX *= -1 ;
      }
      //__ bounce Y
      if((circle.position.y<0)||(circle.position.y>this.winSize.vh)){
        circle.data.veloY *= -1 ;
      }
      //__ hue compare
      if(this.desColor[i] > this.h[i]){
        if(this.hueVector[i] === 0){
          if(this.desColor[i] - this.h[i] > 180){
            this.hueVector[i] = -1;
          }else{
            this.hueVector[i] = 1;
          }
        }
      }else if(this.h[i] > this.desColor[i]){
        if(this.hueVector[i] === 0){
          if(this.h[i] - this.desColor[i] > 180){
            this.hueVector[i] = 1;
          }else{
            this.hueVector[i] = -1;
          }
        }
      }else{
        this.hueVector[i] = 0;
      }
      //__ hue Change
      if(this.hueVector[i] !==0){
        this.h[i] += (this.hueVelocity*this.hueVector[i]);
        this.h[i] = bbc.hueModify(this.h[i]);
      }
      //__ level Change
      let lcGo = false;
      if(this.bbcAppear){
        if(this.l[0] < this.desLev[0]){
          lcGo = true;
          this.l[0] += this.AT.levelVelocity;
        }
        if(this.l[1] < this.desLev[1]){
          lcGo = true;
          this.l[1] += this.AT.levelVelocity;
        }
      }else{
        if(this.l[0] > 0){
          lcGo = true;
          this.l[0] -= this.AT.levelVelocity;
        }
        if(this.l[1] > 0){
          lcGo = true;
          this.l[1] -= this.AT.levelVelocity;
        }
      }
      //__ Color Render
      if((this.hueVector[i] !== 0)||(lcGo)){
        circle.fillColor.gradient.stops = [
          bbc.HSLA(this.h[i], 100, this.l[0], 1),
          bbc.HSLA(this.h[i], 100, this.l[1], 0)
        ];
      }
    }
  },
  watch: {
    // _______________________TRIGGERS
    NEW_PATHS(nu, old){
      if(nu === 0){
        this.bbcTrigger(false);
      }else if(nu > old){
        this.bbcTrigger(true);
        this.setBBC({comp:-1, hue:-1});
      }
    },
    bbcAppear(nu, old){
      if(nu){
        this.desLev = [42, 38];
      }else{
        this.desLev = [0, 0];
      }
      return old
    }
  },
  created() {
    this.h = this.desColor;
    this.scope = new paper.PaperScope();
  },
  mounted() {
    this.scope.setup(document.getElementById('BG'));
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });


    let circles = [];
    for(var i=0; i < this.amount; i++){
      this.hueVector.push(0);
      var circle = new this.scope.Path.Circle({
        center: new this.scope.Point(
          Math.random() * (this.winSize.vw),
          Math.random() * (this.winSize.vh)),
        radius: random(this.radius.min, this.radius.max),
        data: {
          veloX: random(0,this.AT.circleVelocity),
          veloY: random(0,this.AT.circleVelocity)
        }
      });
      circle.fillColor = {
        gradient: {
          stops: [
            bbc.HSLA(this.desColor[i], 100, this.l[0], 1), 
            bbc.HSLA(this.desColor[i], 100, this.l[1], 0)
          ],
          radial: true
        },
        origin: circle.position,
        destination: circle.bounds.rightCenter
      };
      circle.blendMode = 'saturation'
      circles[i] = circle;
    }
    this.scope.view.onFrame = () => {
      for(var i=0; i < this.amount; i++){
        this.moveCircles(circles[i], i);
      }
    }
  },
}
</script>


<style lang="scss" scoped> 
#background {
  position: fixed; top: 0; left: 0; 
  padding: 0; margin: 0;
  width: 100vw; height: 100vh;
  // background-color: black;
  background-color: rgb(214, 217, 226);
  color: transparent;
}
#BG {
  z-index: -10;
  pointer-events: none;
  position: absolute; top: 0; left: 0; 
  padding: 0; margin: 0;
  width: 100%; height: 100%;
}
#bg-loading {
  z-index: -20;
  pointer-events: none;
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%;
  transition: '500ms';
  background-color: #1130D1;
}
</style>