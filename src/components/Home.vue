<template>
<div id="home">

<br><br><br><br>
<br><br><br><br>
<br><br><br><br>
<br><br><br><br>
<h1>
  <a href="http://www.keemgunn.com/nameparade">go to /nameparade</a>
</h1>

</div>
</template>



<script>
import{ mapState, mapGetters, mapMutations} from 'vuex';

export default {
  name: "Home",
  components: { },
  props: [

  ],
  data() { return {

  }},
  computed: {
    ...mapState([]),
    ...mapGetters([]),


  },
  methods: {
    ...mapMutations([]),

    
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
#home{
  font-family: 'Montserrat', sans-serif;
  color: aliceblue;
  text-align: center;
  a:visited {
    color: blue;
  }
}





</style>