<template>
<div class="list-wrapper"
:class="{'list-selected': selected}"
@click="select()"
>

  <div id="path-wrapper">
    <div class="bound-box">
      <div class="index-marker">
        {{index}}
      </div>
      <div id="bound">
          <svg 
          :id="svgId"
          class="list-path-box"
          viewBox="0 0 710 710" version="1.1" 
          xmlns="http://www.w3.org/2000/svg" 
          xmlns:xlink="http://www.w3.org/1999/xlink"
          fill="none"
          stroke-width="8"
          stroke-linecap="round"
          strokeLinejoin="round">
          </svg>
      </div>
    </div>
  </div>

  <div id="info-wrapper">
    <div class="info-box">
      <div class="name">{{userName}}</div>
      <div class="time">{{userTime}}</div>
      <div class="ip">{{info.ip}}</div>
      <div class="location">{{locationInfo}}</div>
      <div class="uag">{{userAgent}}</div>
    </div>
  </div>

</div>
</template>


<script>
import{ mapGetters } from 'vuex';
import randomstring from 'randomstring';
const rand = randomstring.generate(6);

const name ="List";
export default {
  name,
  components: { },
  props: [ 'rawData', 'index', 'isDisplayed' ],
  data() { return {
    info: null,
    pathData: null,
    userName: null,
    userTime: null,
    bounds: null,
    trans: null,
    paths: [],
    pathId: [],
    pathBox: null, 
    selected: false
  }},

  computed: {
    ...mapGetters(['npMASTER']),

    svgId: function(){
      return 'pb-' + this.pathData[1]
    },

    locationInfo: function(){
      return 'location'
    },

    userAgent: function(){
      return 'user-agent'
    },

    selection: function(){
      return this.npMASTER.selected
    }

  },
  methods: {
    select(){
      const io = this.selection.indexOf(this.index)
      if(io === -1){
        this.$store.state.np.master.selected.push(this.index);
        this.selected = true;
      }else{
        this.$store.state.np.master.selected.splice(io, 1);
        this.selected = false;
      }
      console.log(this.npMASTER.selected);
    }
  },
  created() {
    this.pathData = this.rawData.pathArr;
    this.info = this.rawData.info;
    if(this.isDisplayed !== -1){
      this.selected = true;
      this.$store.state.np.master.selected.push(this.index);
    }

    const pathDataIndex = 7;
    for(var i=pathDataIndex; i<this.pathData.length; i++){
      this.paths.push(this.pathData[i]);
      this.pathId.push(rand+'-list-'+(i-pathDataIndex));
    }

    this.bounds = "0 0 " + this.pathData[2] + ' ' + this.pathData[3];
    this.trans = "translate( -" + (this.pathData[4]) + ", -" + this.pathData[5] + ")";
    this.userName = this.pathData[0];
    this.userTime = new Date(this.pathData[1]);

  },
  mounted() {
    const target = '#pb-' + this.pathData[1];
    this.pathBox = document.querySelector(target);

    this.pathBox.setAttribute("viewBox", this.bounds);

    for(var i=0; i<this.pathId.length; i++){
      let pathNode = document.createElementNS("http://www.w3.org/2000/svg", 'path');
      pathNode.setAttribute("id", this.pathId[i]);
      pathNode.setAttribute("d", this.paths[i]);
      pathNode.setAttribute("transform", this.trans);
      // pathNode.style.stroke = ""
      this.pathBox.appendChild( pathNode );
    }
  },
}
</script>



<style lang="scss" scoped> 
.list-wrapper{
  position: relative; top: 0; left: 0;
  width: 100vw;
  height: 28vw;
  margin-top: 1vh;
  margin-bottom: 1vh;
  user-select: none;
  font-family: 'Montserrat', 'Core Gothic D', sans-serif;
  opacity: 0.64;
  transition: 300ms;
  // background-color: rgba(128, 255, 0, 0.205);
  svg {
    stroke: white;
  }
  #path-wrapper{
    .bound-box{
      position: relative;
      float: left;
      width: 42vw;
      height: 21vw;
      .index-marker{
        position: absolute; top: 9%; left: 2%;
        font-weight: 700;
      }
      #bound{
        position: relative; 
        top: 15%; left: 8%;
        width: 94%; height: 94%;
        // background-color: cornflowerblue;
      }
    }
  }
  #info-wrapper{
    .info-box{
      position: relative;
      float: right;
      text-align: right;
      overflow: hidden;
      width: 55vw;
      height: 30vw;
      padding-right: 2.6vw;
      // background-color: rgb(69, 83, 20);
    }
    .name{
      position: relative;
      top: 2vw;
      font-size: 4.4vw;
      font-weight: 500;
      line-height: 8.6vw;
    }
    .time{
      position: relative;
      top: 1.5vw;
      font-size: 2.8vw;
      font-weight: 400;
    }
    .ip{
      position: relative;
      top: 1.5vw;
      font-size: 2.8vw;
      font-weight: 400;
    }
    .location{
      position: relative;
      top: 1.5vw;
      font-size: 2.8vw;
      font-weight: 400;
    }
    .uag{
      position: relative;
      top: 1.5vw;
      font-size: 2.8vw;
      font-weight: 400;
    }
  }
}
.list-wrapper:active {
  transition: 140ms;
  background-color:rgba(67, 111, 255, 0.555);
}
.list-selected{
  transition: 300ms;
  opacity: 1;
  color: rgb(68, 96, 255);
  svg {
    stroke: rgb(68, 96, 255);
  }
}

</style>