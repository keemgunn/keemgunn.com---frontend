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
      this.$store.state.root.winSize.vw = window.innerWidth
      this.$store.state.root.winSize.vh = window.innerHeight
      return this.VIEWTYPE
    },
  },
  created() {
    this.onResize();
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
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