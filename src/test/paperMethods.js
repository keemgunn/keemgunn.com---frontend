function boundCheck(scope){
  let bounds = scope.view.bounds;
  let coords = [
    [0, 0],
    [bounds.width, 0],
    [bounds.width, bounds.height],
    [0, bounds.height],
  ];
  for(var i=0; i < coords.length; i++){
    var circle = new scope.Path.Circle([
      coords[i][0], coords[i][1]
    ], 10);
    circle.fillColor = 'cyan';
  }
  console.log(coords);
}
// boundCheck(this.scope);








export { boundCheck };