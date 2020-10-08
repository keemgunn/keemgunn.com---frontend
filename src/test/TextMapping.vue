<template>
<div id="text-mapping">
  <div id="img-box">
    <img id="gs" src="./gs.jpg" alt="gs">
  </div>
  <canvas id="field"></canvas>
  <div id="output-display">
    {{output}}
  </div>
</div>
</template>


<script>
const paper = require ('paper');
const name ="TextMapping";
export default {
  name,
  data() { return {
    scope: null,
    output: '---- OUTPUT ---- \n',
  }},
  created() {
    this.scope = new paper.PaperScope();
  },
  mounted() {
    this.scope.setup(document.getElementById('field'));
    var rasterEl  = document.getElementById('gs');
    var raster = new this.scope.Raster(rasterEl);

    raster.position = this.scope.view.center;
    raster.scale(0.055);
    raster.visible = true;
    console.log(raster.size);

    let viewSize = this.scope.view.bounds.width;

    // let colorArr = [];

    let rectWidth = 8;
    let rectHeight = 16;

    let gridStartTop = 215;
    let gridStartLeft = 6;

    let wCount = parseInt(viewSize/rectWidth);
    let hCount = parseInt(viewSize/rectHeight);
    console.log(`wCount: ${wCount}, hCount: ${hCount}`);

    function getGridColors({scope, raster}){
      for(var i=0; i<hCount; i++){
        let str = ''
        let top = gridStartTop + (rectHeight * i);
        for(var j=0; j<wCount; j++){
          let left = gridStartLeft + (rectWidth * j);
          var path = new scope.Path.Rectangle(
            new scope.Point(left, top),
            new scope.Size(rectWidth, rectHeight)
          );
          const colorData = raster.getAverageColor(path);
          path.strokeColor = 'red';
          path.fillColor = raster.getAverageColor(path);
          const ct = getText(colorData.gray);
          str = str.concat(ct);
        }
        console.log(str);
      }
    }

    function getText(data){
      if(data > 0.91){
        return ' '
      }
      else if(data > 0.82){
        return '.'
      }
      else if(data > 0.73){
        return ','
      }
      else if(data > 0.64){
        return '-'
      }
      else if(data > 0.55){
        return '~'
      }
      else if(data > 0.46){
        return '+'
      }
      else if(data > 0.37){
        return '='
      }
      else if(data > 0.28){
        return '*'
      }
      else if(data > 0.19){
        return '#'
      }
      else if(data > 0.10){
        return '$'
      }
      else{ // 0
        return '@'
      }
    }
    setTimeout(getGridColors, 3000, {
      scope: this.scope,
      raster: raster
    });
  },
}
</script>



<style lang="scss" scoped> 
#text-mapping{
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgb(99, 99, 99);
} 

#img-box{
  position: absolute;
  display: none;
  width: 100%; height: 100%;
  img{
    width: 100%;
    object-fit: cover;
  }
}

#field{
  position: absolute;
  top: 0; left: 0;
  padding: 0;
  margin: 0;
  width: 100%; height: 100%;
}

#output-display{
  position: absolute;
  top: 20%; left: 0;
  width: 100vw;
  height: 120vw;
  font-family: 'Space Mono';
  font-size: 12px;
  color: white;
}

</style>