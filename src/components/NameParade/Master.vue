<template>
<div id="master">

  <div id="aligner">

    <transition name="writer-des-appear">
    <div id="login-box" v-if="!authorized">
      <div id="name-box">
        <form id="box" 
        @submit.prevent
        autocomplete="off">
          <input 
            id="field" 
            class="field"
            placeholder="password"
            type="text"
            spellcheck="false"
            @input="password = $event.target.value"
          >
          <div class="box-border"></div>
        </form>
      </div>
    </div>
    </transition>
      <div class="submit-box" :class="{'invisible': !password.length}">
        <div class="bw">
          <div class="btn" 
          @click="login()"
          >login</div>
        </div>
      </div>
  </div>

  <transition name="writer-des-appear">
  <div class="list-box" v-if="authorized">
    <div class="list-item"
    v-for="rawData in rawSignsArr" 
    :key="'raw-sign-' + rawSignsArr.indexOf(rawData)">
      <MasterList 
        :rawData="rawData"
        :index="rawSignsArr.indexOf(rawData)"
        :isDisplayed="signDisplay.indexOf(rawSignsArr.indexOf(rawData))"
      />
    </div>

    <div class="submit-box" v-if="authorized">
      <div class="bw">
        <div class="btn" 
        @click="submitData()"
        >submit</div>
      </div>
    </div>
  </div>
  </transition>

  

</div>
</template>



<script>
import{ mapState, mapGetters, mapMutations} from 'vuex';
import MasterList from './master/MasterList'
import axios from 'axios';

let isTest = false;
// isTest = true;
export default {
  name: "Master",
  title: "nameparade-master",
  components: { MasterList },
  data() { return {
    dataURL: '',
    password: '',
    authorized: false,
    rawSignsArr: [],
    signDisplay: []
  }},
  computed: {
    ...mapState([]),
    ...mapGetters([]),
  },
  watch: {
  },
  methods: {
    ...mapMutations(['adjustDI']),
    async init(){
      const {data} = await axios.get('/nameparade/master/info')
      this.dataURL = data.url;
      this.signDisplay = data.signDisplay;
      console.log(this.dataURL);
    },
    async login(){
      const endpoint = this.dataURL + '/master/authenticate'
      const { data } = await axios.post(endpoint, { password: this.password })
      if(data.authorized){
        this.authorized = true;
        console.log('-- authorized --');
        this.loadData();
      }else{
        this.authorized = false;
        console.log('-- authorized failed --');
      }
    },
    async loadData(){
      const endpoint = this.dataURL + '/master/get-all-raw-data';
      const { data } = await axios.post(endpoint, { password: this.password })
      this.rawSignsArr = data.arg
    },
    submitData(){
      this.adjustDI(this.password);
      this.authorized = false;
    }
  },
  created() {
    if(isTest){
      this.password = 'gunnkeem126!astro'
      this.dataURL = "http://nameparadedata-env.eba-wuyqf8u8.ap-northeast-2.elasticbeanstalk.com";
      this.signDisplay = [0, 1, 2, 3, 4, 5, 6, 7];
      this.authorized = true;
      this.loadData();
    }else{
      this.init();
    }
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
@import "../../assets/styles/np-animation.scss";
@import "../../assets/fonts/CoreGothicD/coregothicd.css";

#master{
  z-index: 0;
  display: flex;
  position: absolute; top: 0; left: 0;
  width: 100vw; height: 100vh;
  justify-content: center;
  align-items: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: auto;
  margin: 0; padding: 0;
  color: azure;
  font-family: 'Montserrat', sans-serif;
}
#aligner{
  display: block;
  position: relative; top: 0; left: 0;
  width: fit-content; height: fit-content;
  overflow: auto;
  // background-color: rgba(0, 255, 255, 0.527);
}

#login-box{
  position: relative; top: 0; left: 0;
  width: 80vw; height: 11vw;
  border: 2px solid aliceblue;
}
#box{
  position: relative; top: 0; left: 0;
  width: 100%; height: 100%;
  .field {
    display: block;
    position: relative; top: 0; left: 0;
    width: 100%; height: 100%;
    border: 0; border-radius: 0; outline: 0;
    font-family: 'Montserrat', 'Core Gothic D', sans-serif;
    font-weight: 300;
    text-align: center;
    letter-spacing: -0.86px;
    color: white;
    caret-color: white;
    font-size: 6.8vw;
    padding: 1.2vw 0 1vw 0;
    background-color: transparent;
    transition: 300ms;
    &::placeholder {
    color: rgba(240, 248, 255, 0.411);
    }
  }#field:hover {
    transition: 200ms;
  }::selection {
    color: black;
    background: rgba(240, 248, 255, 0.589);
  }
  .box-border{
    position: absolute; bottom: 0;
    height: 1px;
    background-color: white;
  }
}.input-locked {
  pointer-events: none;
  user-select: none;
}

.list-box{
  position: absolute; top: 0; left: 0;
  width: 98%; height: fit-content;
  padding: 5vh 0 15vh 0;
  // background-color: rgba(137, 43, 226, 0.575);
  .list-item{
    position: relative; top: 0; left: 0;
    width: 100%; height: fit-content;
    border-bottom: 1px solid rgba(255, 255, 255, 0.699);
  }
}

.submit-box{
  position: relative;
  margin-top: 6vw;
  width: 100%;
  transition: 300ms;
  .bw{
    display: flex;
    width: 100%;
    justify-content: center;
    height: calc(88vw * (.16));
    font-size: 5vw;
    line-height: 11.5vw;
    text-align: center;
    // margin-top: 2vw;
    .btn {
      position: absolute; 
      width: 48%; height: 82%;
      border: 2px solid white;
      user-select: none;
      font-family: 'Montserrat', sans-serif;
      font-weight: 400;
      letter-spacing: -0.6%;
      transition: 600ms;
      cursor: pointer;
      background-color: transparent;
      transition: 600ms;
    }
    .btn:active {
      transition: 140ms;
      background-color:rgba(240, 248, 255, 0.55);
    }
  }
}.invisible{
  pointer-events: none;
  opacity: 0;
  transition: 300ms;
}

</style>