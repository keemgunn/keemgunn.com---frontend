<template>
<div id="path-view">

  <svg 
  class="path-box"
  viewBox="0 0 710 710" version="1.1" 
  xmlns="http://www.w3.org/2000/svg" 
  xmlns:xlink="http://www.w3.org/1999/xlink"
  fill="none"
  stroke-width="7.5"
  stroke-linecap="round"
  strokeLinejoin="round">
  </svg>

  <transition name="pathview-info">
  <div id="user-info" v-if="infoDisplay">
    <div id="by-wrapper">
      <div class="by" :class="byType">
        by:
      </div>
    </div>
    <div id="name-wrapper">
      <div class="name" :class="byType">{{pathData[0]}}</div>
    </div>
    <div id="time-wrapper">
      <div class="time" :class="byType">{{userTime}}</div>
    </div>
  </div>
  </transition>

</div>
</template>


<script>
import{ mapGetters, mapMutations} from 'vuex';
const { Timeline, keys } = require('../../../assets/NameParade/javascripts/circleAnime');
import anime from 'animejs';
import randomstring from 'randomstring';
const rand = randomstring.generate(6);
export default {
  name: "PathView",
  props: [ 'pathData' ],
  data() { return {
    userName: null,
    userTime: null,
    bounds: null,
    trans: null,
    paths: [],
    pathId: [],
    pathBox: null,
    childs: [],
    WritingAnimation: null,
    RemoveAnimation: null,
    infoDisplay: false,
  }},

  computed: {
    ...mapGetters(['byType']),
  },

  methods: {
    ...mapMutations(['bbcTrigger']),

    startAnimation(pathId){
    //________________________REMOVE ANIMATION___________
      this.RemoveAnimation = Timeline(anime)
      .add({ 
        targets: '.path-box path',
        stroke: [
          keys('rgba(255, 255, 255, 0.733)', 0, 1, 0, "easeOutCubic"),
          keys('rgba(255, 255, 255, 0)', 3500, 2000, 0, "easeOutCubic")
        ],
        strokeDashoffset: [
          {
            value: [0, anime.setDashoffset], 
            delay:  5500,
            duration: 5,
            endDelay: 0,
            direction: 'alternate',
            easing: "linear",
          }
        ],
      });
      this.RemoveAnimation.finished.then(()=>{
        for(var i=0; i < this.childs.length; i++){
          this.pathBox.removeChild(this.childs[i]);
        }
      });
    //________________________WRITING ANIMATION___________
      this.WritingAnimation = Timeline(anime);
      for(var i=0; i < pathId.length; i++){
        this.addAnime(this.WritingAnimation, i);
      }
      this.WritingAnimation.finished.then(() => {
        this.progress(); // trigger border out
        this.RemoveAnimation.play();
        setTimeout(this.bbcTrigger, 3800, false);
        setTimeout(this.triggerInfo, 3800, false);
        this.WritingAnimation = null;
      })
      this.$store.state.desColor = this.pathData[6];
      this.bbcTrigger(true);
      this.WritingAnimation.play();
      this.triggerInfo(true);
      this.progress(); // trigger border in
    },

    addAnime(Ani, i){
      let id = '#' + rand + '-p-' + i;
      Ani.add({ targets: id,
        stroke: [
          keys('rgba(255, 255, 255, 1)', 1, 80, 0, "easeOutCubic"),
          keys('rgba(255, 255, 255, 0.733)', 81, 300, 0, "easeOutCubic")
        ],
        strokeDashoffset: [
          {
            value: [anime.setDashoffset, 0], 
            delay:  0,
            duration: function() { return anime.random(300, 500); },
            endDelay: 0,
            direction: 'alternate',
            easing: "linear",
          }
        ],
      })
    },

    removeAnime(pathId){
      for(var i=0; i<pathId.length; i++){
        anime.remove('#'+pathId[i]);
      }
    },

    progress(){
      this.$store.state.renderStatus += 1;
    },

    triggerInfo(bool){
      this.infoDisplay = bool;
    }

  },
  created() {

    const pathDataIndex = 7;
    for(var i=pathDataIndex; i<this.pathData.length; i++){
      this.paths.push(this.pathData[i]);
      this.pathId.push(rand+'-p-'+(i-pathDataIndex));
    }

    this.bounds = "0 0 " + this.pathData[2] + ' ' + this.pathData[3];
    this.trans = "translate( -" + (this.pathData[4]) + ", -" + this.pathData[5] + ")";
    this.userName = this.pathData[0];
    this.userTime = new Date(this.pathData[1]);

  },
  mounted() {

    this.pathBox = document.querySelector('.path-box');
    this.pathBox.setAttribute("viewBox", this.bounds);

    for(var i=0; i<this.pathId.length; i++){
      let pathNode = document.createElementNS("http://www.w3.org/2000/svg", 'path');
      pathNode.setAttribute("id", this.pathId[i]);
      pathNode.setAttribute("d", this.paths[i]);
      pathNode.setAttribute("transform", this.trans);
      // pathNode.style.stroke = ""
      this.childs.push(pathNode);
      this.pathBox.appendChild( pathNode );
    }

    setTimeout(this.startAnimation, 200, this.pathId);

  },
  beforeDestroy() {
    this.WritingAnimation = null;
  },
}
</script>


<style lang="scss" scoped> 
#path-view{
  position: absolute; top: 0%; left: 0;
  width: 100%; height: 100%;
  // background-color: rgba(194, 102, 102, 0.336);
}
.path-box{
  position: absolute; top: 7; left: 0;
  width: 100%; height: 68%;
  // stroke: rgba(255, 255, 255, 0.733);
}
#user-info{
  position: absolute; bottom: 0; left: 0;
  width: 100%; height: 32%;
  user-select: none;
  overflow: hidden;
  // background-color: rgba(228, 162, 40, 0.384);
}
#by-wrapper{
  position: absolute; bottom: 0; left: 0;
  width: 100%; height: 100%;
  .by {
    position: absolute;
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    letter-spacing: 1.1px;
    // background-color: darkseagreen;
  }._small{    
    top: 2.4vw; left: 5vw;
    width: 8.5vw; height: 30%;
    font-size: 4.4vw;
  }._narrow{
    top: 2.4vw; left: 5vw;
    width: 8.5vw; height: 30%;
    font-size: 4.4vw;
  }._tablet{
    top: 12%; left: 2.5%;
    width: 13%; height: 30%;
    font-size: 4vw;
  }._wide{
    top: 12%; left: 3%;
    width: 13%; height: 30%;
    font-size: 2.3vw;
  }
}
#name-wrapper{
  position: absolute; bottom: 0; left: 0;
  width: 100%; height: 100%;
  .name{
    position: absolute;
    font-family: 'Montserrat', 'Core Gothic D', sans-serif;
    font-weight: 500;
    text-align: left;
    overflow: hidden;
    // background-color: rgb(178, 230, 38);
  }._small{    
    top: 2.4vw; left: 14.4vw;
    width: 60vw; height: 30%;
    font-size: 4.2vw;
  }._narrow{
    top: 2.4vw; left: 14.4vw;
    width: 60vw; height: 30%;
    font-size: 4.2vw;
  }._tablet{
    top: 12%; left: 15%;
    width: 79%; height: 30%;
    font-size: 4vw;
  }._wide{
    top: 12%; left: 16%;
    width: 79%; height: 30%;
    font-size: 2.3vw;
  }
}
#time-wrapper{
  position: absolute; bottom: 0; left: 0;
  width: 100%; height: 100%;
  overflow: hidden;
  .time{
    position: absolute;
    font-family: 'Montserrat', 'Core Gothic D', sans-serif;
    font-weight: 400;
    text-align: left;
    overflow: hidden;
    // background-color: rgb(218, 167, 30);
  }._small{    
    top: 9.2vw; left: 4vw;
    width: 57vw; height: 8.6vw;
    padding-left: 2%;
    font-size: 3vw;
  }._narrow{
    top: 9.2vw; left: 4vw;
    width: 57vw; height: 8.6vw;
    padding-left: 2%;
    font-size: 3vw;
  }._tablet{
    top: 41%; left: 3.5%;
    width: 66%; height: 38%;
    padding-left: 2%;
    font-size: 2.8vw;
  }._wide{
    top: 46%; left: 3.5%;
    width: 79%; height: 38%;
    padding-left: 2%;
    font-size: 1.6vw;
  }
}
</style>