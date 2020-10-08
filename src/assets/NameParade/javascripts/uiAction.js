const bbc = {
  hueModify: function(i){
    if(i > 359){
      return 0
    }else if(i >= 0){
      return i
    }else{
      return 360 + i
    }
  },
  HSLA: function(h, s, l, a){
    return 'hsl('+ h + 'deg,' + s + '%, ' + l + '%, ' + a + ')'
  },
};
const colorHarmonies = [
  [-30, 30, -40, +40, 0],
  [-35, 35, -45, +45, 0],
  [-30, 30, -40, +40, 180],
  [0, 0, 180, 180, 180],
  [-20, +20, +180, +180, 0]
];
function newBBC({comp, hue}){
  let harmonies, stdColor;
  if(comp<0){
    harmonies = colorHarmonies[randomInt(0, colorHarmonies.length)];
  }else{
    harmonies = colorHarmonies[comp]
  }
  if(hue<0){
    stdColor = randomInt(0, 360);
  }else{
    stdColor = hue
  }
  let result = [stdColor];
  for(var i=0; i<harmonies.length; i++){
    result.push(bbc.hueModify(stdColor + harmonies[i]));
  }
  return result
}



function random(min, max) {
  return Math.random() * (max - min) + min
}
function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
  // 최댓값은 제외, 최솟값은 포함
} 

export { 
  bbc,
  newBBC,
  random, 
  randomInt,

}