<template>
<div id="index">
  <router-view></router-view>
</div>
</template>

<script>
import{ mapGetters, mapMutations } from 'vuex';

export default {
  name: "Index",
  components: { },
  props: [

  ],
  data() { return {

  }},
  computed: {
    ...mapGetters(['VIEWTYPE']),
  },
  watch: {
    VIEWTYPE(nu, old){
      console.log('viewtype change:', nu);
      return old
    }
  },
  methods: {
    ...mapMutations([]),
    onResize() {
      this.$store.state.Index.winSize.vw = window.innerWidth
      this.$store.state.Index.winSize.vh = window.innerHeight
    },
  },
  created() {
    this.onResize();
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
    console.log(this.VIEWTYPE);
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






</style>