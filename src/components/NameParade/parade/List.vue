<template>
<div id="list-wrapper">

  <div id="path-wrapper">
    <div class="bound-box" :class="byType">
      <div id="bound">
          <svg 
          :id="svgId"
          class="list-path-box"
          viewBox="0 0 710 710" version="1.1" 
          xmlns="http://www.w3.org/2000/svg" 
          xmlns:xlink="http://www.w3.org/1999/xlink"
          fill="none"
          stroke-width="8"
          stroke="white"
          stroke-linecap="round"
          strokeLinejoin="round">
          </svg>
      </div>
    </div>
  </div>

  <div id="info-wrapper">
    <div class="info-box" :class="byType">
      <div class="name">{{userName}}</div>
      <div class="time">{{userTime}}</div>
    </div>
  </div>

</div>
</template>


<script>
import{ mapState, mapGetters } from 'vuex';
import randomstring from 'randomstring';
const rand = randomstring.generate(6);

const name ="List";
export default {
  name,
  components: { },
  props: [ 'pathData' ],
  data() { return {
    userName: null,
    userTime: null,
    bounds: null,
    trans: null,
    paths: [],
    pathId: [],
    pathBox: null, 
  }},

  computed: {
    ...mapState([]),
    ...mapGetters(['byType']),

    svgId: function(){
      return 'pb-' + this.pathData[1]
    }

  },
  created() {

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
#list-wrapper{
  position: relative; top: 0; left: 0;
  width: 100%; height: 100%;
  user-select: none;
  opacity: 1;
  // background-color: wheat;
}
#path-wrapper{
  .bound-box{
    position: relative;
    float: left;
    // background-color: rgb(20, 83, 75);
  }._small{
    width: 40vw;
    height: 20vw;
  }._narrow{
    width: 40vw;
    height: 20vw;
  }._tablet{
    width: 32vw;
    height: 16vw;
  }._wide{
    width: 20vh;
    height: 10vh;
  }
}
#bound{
  position: relative; 
  top: 6%; left: 2%;
  width: 94%; height: 94%;
}

#info-wrapper{
  .info-box{
    position: relative;
    float: right;
    text-align: right;
    font-family: 'Montserrat', 'Core Gothic D', sans-serif;
    overflow: hidden;
    // background-color: rgb(69, 83, 20);
  }._small{
    width: 53vw;
    height: 20vw;
    padding-right: 2.6vw;
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
  }._narrow{
    width: 53vw;
    height: 20vw;
    padding-right: 2.6vw;
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
  }._tablet{
    width: 44vw;
    height: 16vw;
    padding-right: 2vw;
    .name{
      font-size: 4vw;
      font-weight: 500;
      line-height: 8.6vw;
    }
    .time{
      font-size: 1.8vw;
      font-weight: 400;
    }
  }._wide{
    width: 22vw;
    height: 10vh;
    padding-right: 1vw;
    .name{
      font-size: 2vw;
      font-weight: 500;
      line-height: 4vw;
    }
    .time{
      font-size: 1.1vw;
      font-weight: 400;
    }
  }
}

</style>