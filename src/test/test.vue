<template>
<div id="test">


  <h1>TEST</h1>

  vw: {{winSize.vw}} <br>
  vh: {{winSize.vh}} <br>
  viewtype: {{viewtype}} <br>
  SEQ: {{SEQ}} <br>
  writer.scopeSize:{{writer.scopeSize}}
  




  <br>
  msg00: {{msg00}} <br>
  msg01: {{msg01}} <br>
  msg02: {{msg02}} <br>
  msg03: {{msg03}} <br>
  msg04: {{msg04}} <br>




  <button>test A</button><br>

  <button>test B</button><br>

  <button>test C</button><br>

  <button>test D</button><br>

  <button>test E</button><br>




</div>
</template>



<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: "test",
  components: { },
  props: [

  ],
  data() { return {
    msg00: null,
    msg01: null,
    msg02: null,
    msg03: null,
    msg04: null,
  }},
  computed: {
    ...mapState(['viewtype', 'winSize', 'writer']),
    ...mapGetters(['byType', 'SEQ']),
  },
  methods: {
    ...mapMutations(['setBBC']),
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
  #test {
    position: fixed; top: 10px; left: 3px;
    width: 100px; height: fit-content;
    padding: 3px;
    border: solid 1px white;
    font-family: sans-serif;
    font-size: 13px;
    background-color: rgba(0, 0, 0, 0.753);
    opacity: 0.8;
  }
</style>