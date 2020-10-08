function newPoint(scope, event) {
  return new scope.Point(
    event.point.x,
    event.point.y
  )
}

function getDelta(scope, last, curr){
  return new scope.Point(
    curr.x - last.x,
    curr.y - last.y
  )
}

function Stroke(scope, point, width){
  return new scope.Path({
    segments: [ point ],
    strokeColor: 'white',
    strokeWidth: width,
    strokeCap: 'round',
    strokeJoin: 'round'
  })
}



export {
  newPoint,
  getDelta,
  Stroke
}