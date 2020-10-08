<template>
<div class="pathmaker">
  <canvas id="maker" class="maker"></canvas>
</div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
const paper = require('paper');
const pm = require('../../../assets/NameParade/javascripts/pathmaker');

const name = 'Pathmaker';
export default {
  name,
  components: { },
  data() { return {
    scope: null,
    canvasEl: null,
    canvasCoords: {},
    strokeWidth: 1,
    simplifyVal: 1,
  }},
  computed: {
    ...mapState([
        'winSize',
        'writer',
        'writerUndo'
      ]),
    ...mapGetters([
        'byType', 
        'VIEWTYPE', 
        'NEW_PATHS'
      ]),
    AT: function(){
      return this['aniTiming'][name]
    },
    X: function(){
      return this.canvasCoords.x
    },
    Y: function(){
      return this.canvasCoords.y
    },
    W: function(){
      return this.canvasCoords.w
    },
    H: function(){
      return this.canvasCoords.h
    },
  },
  watch: {

    writerUndo(nu, old){
      if(nu){
        this.writer.paths[nu].remove();
        this.writer.paths.pop();
        this.$store.state.writerUndo = null;
      }else if(nu === 0){
        this.writer.paths[nu].remove();
        this.writer.paths.pop();
        this.$store.state.writerUndo = null;
      }else{
        return old
      }
    }
  },
  methods: {
    ...mapMutations([]),
    onResize(){
      this.canvasCoords = this.getCoords(this.canvasEl);
      this.canvasCoords.center = {
        x: this.canvasCoords.x + (this.canvasCoords.w/2),
        y: this.canvasCoords.y + (this.canvasCoords.h/2)
      };
      this.scope.view.viewSize = new this.scope.Size(
        this.canvasCoords.w , this.canvasCoords.h
      );
      this.scope.view.center = new this.scope.Point(
        this.canvasCoords.center.x, 
        this.canvasCoords.center.y
      )
      this.writer.width = this.W;
      if(this.VIEWTYPE === 'small'){
        this.strokeWidth = this.W / 66;
      }else if(this.VIEWTYPE === 'narrow'){
        this.strokeWidth = this.W / 66;
      }else if(this.VIEWTYPE === 'tablet'){
        this.strokeWidth = this.W / 80;
      }else{
        this.strokeWidth = this.W / 85;
      }
    },
    getCoords(elem) {
      var box = elem.getBoundingClientRect();
      var body = document.body;
      var docEl = document.documentElement;
      var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
      var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
      var clientTop = docEl.clientTop || body.clientTop || 0;
      var clientLeft = docEl.clientLeft || body.clientLeft || 0;
      var top  = box.top +  scrollTop - clientTop;
      var left = box.left + scrollLeft - clientLeft;
      return { 
        x: Math.round(left),
        y: Math.round(top),
        w: box.width, 
        h: box.height,
      };
    },
    exportSvg(){
      this.makeGroup();
      this.makeSvg();
    },
    makeGroup(){
      this.writer.pathGroup = new this.scope.Group({
        children: this.writer.paths
      })
    },
    makeSvg(){
      this.writer.svg = this.writer.pathGroup.exportSVG({
        asString: true,
        // bounds: 'content'
      });
    }
  },
  mounted() {
    this.canvasEl = document.getElementById('maker');
    this.scope = new paper.PaperScope();
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
    this.scope.setup(document.getElementById('maker'));
    this.onResize();

    let contact = 0;
    let path;
    this.scope.view.onMouseEnter = () => {
      contact = 1;
    }
    this.scope.view.onMouseLeave = () => {
      contact = 0;
    }
    this.scope.view.onMouseDown = (event) => {
      contact = 1;
      let firstPoint = pm.newPoint(this.scope, event);
      path = pm.Stroke(this.scope, firstPoint, this.strokeWidth)
    }
    this.scope.view.onMouseDrag = (event) => {
      if(contact){
        let nextPoint = pm.newPoint(this.scope, event);
        path.add(nextPoint);
        path.smooth('continuous');
      }
    }
    this.scope.view.onMouseUp = () => {
      path.simplify(this.simplifyVal);
      contact = 0;
      this.writer.paths.push(path);
      this.$store.state.writer.bounds.width = this.scope.view.bounds.width;
      this.$store.state.writer.bounds.height = this.scope.view.bounds.height;
      this.$store.state.writer.bounds.x = this.scope.view.bounds.x;
      this.$store.state.writer.bounds.y = this.scope.view.bounds.y;
    }
  },
  beforeDestroy() {
    this.exportSvg();
    this.writer.pathGroup.remove();
    this.scope.view.remove();
  },
}
</script>
<style lang="scss" scoped> 
.pathmaker{
  position: relative; top: 0; left: 0;
  width: 100%; height: 100%;
}
#maker{
  z-index: 50;
  position: relative; top: 0; left: 0; 
  width: 100%; height: 100%;
}
</style>