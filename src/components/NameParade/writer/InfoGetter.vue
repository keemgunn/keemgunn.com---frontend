<template>
<div id="info-getter-wrapper">

  <div id="question-wrapper">
    <div class="question" :class="byType">
      And what is YOUR name?
    </div>
  </div>

  <div id="name-box">
    <form id="box" 
    @submit.prevent autocomplete="off"
    :class="{'input-locked':isAnnChecked}">
      <input 
        id="field" 
        class="field" :class="byType"
        placeholder="let me know"
        type="text"
        spellcheck="false"
        @input="newName = $event.target.value"
      >
      <div class="box-border" :style="boxBorder"></div>
    </form>
  </div>

  <div id="checker-wrapper">
    <div class="aligner" 
    :class="{
      'aligner-wide':this.VIEWTYPE==='wide',
      'aligner-checked':this.isAnnChecked }"
    @click="isAnnChecked = !isAnnChecked">
      <div id="checkbox-wrapper">
        <div class="checkbox" :class="byType">
          <div class="border"></div>
          <div class="check" v-if="isAnnChecked">
            <svg viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <title>Group 2</title>
              <g id="symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Group-2">
                  <polygon id="v-copy" fill="#FFFFFF" fill-rule="nonzero" points="12.0943396 18 17.7849057 5 15.4792453 5 10.9169811 15.4245283 6.45283019 5 4 5 9.69056604 18"></polygon>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div id="text-wrapper">
        <div class="text" :class="byType">anonymous</div>
      </div>
    </div>
  </div>


</div>
</template>



<script>
import { mapState, mapGetters, mapMutations } from 'vuex';


const name = 'InfoGetter';
export default {
  name,
  components: { },
  props: [

  ],
  data() { return {
    newName: '',
    isNameFilled: false,
    isAnnChecked: false
  }},
  computed: {
    ...mapState(['writer']),
    ...mapGetters(['VIEWTYPE', 'byType', 'USER_NAME']),
    boxBorder: function(){
      if(this.VIEWTYPE === 'small'){
        return {
          'left': '6vw',
          'width': 'calc(88vw + 4px)',
        }
      }else if(this.VIEWTYPE === 'narrow'){
        return {
          'left': '6vw',
          'width': 'calc(88vw + 4px)',
        }
      }else if(this.VIEWTYPE === 'tablet'){
        return {
          'left': '8vw',
          'width': 'calc(84vw + 4px)',
        }
      }else {
        return {
          'left': '26vw',
          'width': 'calc(48vw + 4px)',
        }
      }
    },
    okToSubmit: function(){
      if(this.isNameFilled || this.isAnnChecked){
        return true
      }else{
        return false
      }
    }
  },
  methods: {
    ...mapMutations([]),
  },
  watch: {
    newName(nu, old){
      if(nu !== ''){
        this.$store.state.writer.info.name = nu;
        this.isNameFilled = true;
      }else{
        this.$store.state.writer.info.name = nu;
        this.isNameFilled = false;
        return old
      }
    },
    okToSubmit(nu, old){
      if(nu){
        this.$emit('toggle-submit-visibility', true);
      }else{
        this.$emit('toggle-submit-visibility', false);
        return old
      }
    },
    isAnnChecked(nu, old){
      if(nu){
        document.getElementById("field").value = this.writer.info.userId;
        this.$store.state.writer.info.name = this.writer.info.userId;
      }else{
        document.getElementById("field").value = this.newName;
        this.$store.state.writer.info.name = this.newName;
        return old
      }
    }
  },
  created() {


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
#info-getter-wrapper {
  position: relative; top: 0; left: 0;
  width: 100%; height: fit-content;
  // background-color: rgba(213, 208, 255, 0.329);
}

#question-wrapper{
  position: relative; top: 0; left: 0;
  width: 100%; height: fit-content;
  user-select: none;
  padding-bottom: 2vh;
  // background-color: rgba(240, 255, 255, 0.308);
  .question{
    position: relative; top: 0;
    height: fit-content;
    padding-top: 3vh;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    text-align: center;
    // background-color: rgba(137, 43, 226, 0.452);
  }._small{
    left: 6vw;
    width: calc(88vw + 4px);
    font-size: 3.9vw;
  }._narrow{
    left: 6vw;
    width: calc(88vw + 4px);
    font-size: 4vw;
  }._tablet{
    left: 18vw;
    width: calc(64vw + 4px);
    font-size: 3vw;
  }._wide{
    left: 32vw;
    width: calc(36vw + 4px);
    font-size: 1.8vw;
  }
}

#box{
  position: relative; top: 0; left: 0;
  width: 100%; height: fit-content;
  .field {
    display: block;
    position: relative; top: 0; left: 0;
    width: 100%;
    border: 0; border-radius: 0; outline: 0;
    font-family: 'Montserrat', 'Core Gothic D', sans-serif;
    font-weight: 300;
    text-align: center;
    letter-spacing: -0.86px;
    color: white;
    caret-color: white;

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
  ._small{
    font-size: 6.8vw;
    padding: 0 0 1.8vw 0;
  }._narrow{
    font-size: 7vw;
    padding: 0 0 1.8vw 0;
  }._tablet{
    font-size: 7vw;
    padding: 0 0 0.9vw 0;
  }._wide{
    font-size: 3.8vw;
    padding: 0 0 0.8vw 0;
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

#checker-wrapper{
  display: flex;
  position: relative; top: 0; left: 0;
  justify-content: center;
  width: 100%; height: fit-content;
  padding: 2vh 0 0.8vh 0;
  // background-color: brown;
  .aligner{
    display: block;
    position: relative; top: 1vh; left: 0;
    width: fit-content; height: fit-content;
    opacity: 0.70;
    transition: 400ms;
  }
  .aligner-wide:hover{
    cursor: pointer;
    transition: 140ms;
    opacity: 1;
  }
  .aligner-checked{
    opacity: 1;
  }
}



#text-wrapper{
  float: right;
  .text{
    font-family: 'Montserrat', sans-serif;
    user-select: none;
    font-weight: 300;
    letter-spacing: -0.86px;
    color: white;
  }._small{
    font-size: 24px;
    line-height: 28px;
    margin-left: 10px;
  }._narrow{
    font-size: 24px;
    line-height: 28px;
    margin-left: 10px;
  }._tablet{
    font-size: 28px;
    line-height: 32px;
    margin-left: 12px;
  }._wide{
    font-size: 28px;
    line-height: 32px;
    margin-left: 12px;
  }
}
#checkbox-wrapper{
  float: left;
  .checkbox{
    position: relative; top: 0; left: 0;
    .border{
      position: absolute; top: 0; left: 0;
      width: 100%; height: 100%;
      border: solid 2px white;
      transition: 400ms;
    }
    .check{
      position: absolute; top: 2px; left: 2px;
      width: 100%; height: 100%;
    }
  }
  ._small{
    width: 20px; height: 20px;
    top: 4px;
  }
  ._narrow{
    width: 20px; height: 20px;
    top: 4px;
  }
  ._tablet{
    width: 22px; height: 22px;
    top: 5px;
  }
  ._wide{
    width: 22px; height: 22px;
    top: 5px;
  }
}









</style>