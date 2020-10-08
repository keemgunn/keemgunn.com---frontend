<template>
<div id="index">
  <router-view></router-view>
</div>
</template>

<script>
import{ mapState, mapGetters, mapMutations} from 'vuex';

export default {
  name: "Index",
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






</style>