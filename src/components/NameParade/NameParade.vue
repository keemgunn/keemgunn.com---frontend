<template>
  <div class="app">
    <Background/>

    <div id="content">

      <Title/>

      <div v-if="blockRendered">
        <transition name="writer-appear">
          <Writer v-if="(SEQ > 1) && (SEQ < 4)"/>
        </transition>
        <Parade v-if="SEQ > 3" />
      </div>

    </div>
  </div>
</template>

<script> 
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import Background from './Background';
import Title from './title/Title';
import Writer from './writer/Writer';
import Parade from './parade/Parade';

// let State, Getters, Mutations, Actions;
// console.log(Reflect.ownKeys(this.$store.getters));

export default {
  name: 'NameParade',
  components: {
    Background,
    Title,
    Writer,
    Parade,
  },
  computed: {
    ...mapState([
        'test', 
        'winSize',
        'blockRendered'
      ]),
    ...mapGetters([
        'TC', 'TS',
        'SIGN_HISTORY',
        'VIEWTYPE',
        'byType', 
        'SEQ', 
        'FILES_IN_SERVER',
        'SIGN_SENT',
      ])
  },
  methods: {
    ...mapMutations([ 'moveTo', 'setBBC' ]),
    ...mapActions([ 'INITIATE', 'startSignLoad' ]),

    onResize() {
      this.winSize.vw = window.innerWidth
      this.winSize.vh = window.innerHeight
    },

  },
  watch: {

    SEQ(nu, old) {
      console.log('-- sequence changed :', old,'->',nu);
      if((nu > 3)&&(this.VIEWTYPE !== 'wide')){
        document.querySelector( 'body' ).style['overflow-y'] = 'auto';
        document.querySelector( 'body' ).style['overflow-x'] = 'hidden';
        document.querySelector( '.app').style['height'] = 'fit-content';
      }
    },

    FILES_IN_SERVER(nu, old){
      if(this.TC.signLoadDone){
        console.log('--- test: start loading signs ---');
        this.startSignLoad();
      }else{
        if(nu.length){
          console.log('--- start loading signs ---');
          console.log('display item count:', nu.length);
          this.startSignLoad();
        }else{
          console.log('--- no sign data ---');
          console.log('display item count:', nu.length);
          this.$store.state.signDataLoaded = true;
          return old
        }
      }
    },

    SIGN_SENT(nu, old){
      if(nu === true){
        if(this.TC.testSequence){
          this.$store.state.test.client.sequenceNow = 4;
        }else{
          this.moveTo(4);
        }
      }else{
        return old
      }
    }

  },
  created() {

    this.onResize();
    this.setBBC({comp:-1, hue:-1});
    this.INITIATE();
    console.log('---history:', this.SIGN_HISTORY);
    if(this.SIGN_HISTORY){
      this.$store.state.sequence = 4
    }

  },
  mounted() {

    this.onResize();
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
    if( (this.SEQ>3) && (this.VIEWTYPE !== 'wide') ){
      document.querySelector( 'body' ).style['overflow-y'] = 'auto';
      document.querySelector( 'body' ).style['overflow-x'] = 'hidden';
      document.querySelector( '.app').style['height'] = 'fit-content';
    }

  },
  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  },
}
</script>


<style lang="scss">
  @import "../../assets/styles/animations.scss";
  @import "../../assets/fonts/CoreGothicD/coregothicd.css";
  body {
    overflow: hidden;
    background-color: black;
  }

  .app {
    z-index: 0;
    position: absolute; top: 0; left: 0;
    margin: 0; padding: 0;
    width: 100vw; 
    height: 300vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: aliceblue;
  }

  #content{
    z-index: 0;
    position: relative; top: 0; left: 0;      
    margin: 0; padding: 0;
    width: 100%; height: 100%;
  }


</style>
