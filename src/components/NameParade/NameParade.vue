<template>
  <div class="app">
    <Background/>

    <div id="content">

      <Title/>

      <div v-if="BLOCK_RENDERED">
        <transition name="writer-appear">
          <Writer v-if="(SEQ > 1) && (SEQ < 4)"/>
        </transition>
        <Parade v-if="SEQ > 3" />
      </div>

    </div>
  </div>
</template>

<script> 
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Background from './Background';
import Title from './title/Title';
import Writer from './writer/Writer';
import Parade from './parade/Parade';

// let State, Getters, Mutations, Actions;
// console.log(Reflect.ownKeys(this.$store.getters));

export default {
  name: 'NameParade',
  title: 'NAMEPARADE-GUNN',
  components: {
    Background,
    Title,
    Writer,
    Parade,
  },
  computed: {
    ...mapGetters([
        'TC', 'TS',
        'SIGN_HISTORY',
        'VIEWTYPE',
        'byType', 
        'SEQ', 
        'BLOCK_RENDERED',
        'SIGNS_INDEX',
        'SIGN_SENT',
      ])
  },
  methods: {
    ...mapMutations([ 'moveTo', 'setBBC' ]),
    ...mapActions([ 'nameparade_INITIATE', 'startSignLoad' ]),
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

    SIGNS_INDEX(nu, old){
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
          this.$store.state.np.signDataLoaded = true;
          return old
        }
      }
    },

    SIGN_SENT(nu, old){
      if(nu === true){
        this.moveTo(4);
      }else{
        return old
      }
    }

  },
  created() {

    this.setBBC({comp:-1, hue:-1});
    this.nameparade_INITIATE();
    console.log('---history:', this.SIGN_HISTORY);
    if(this.SIGN_HISTORY){
      this.$store.state.np.sequence = 4
    }

  },
  mounted() {
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
  @import "../../assets/styles/np-animation.scss";
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
