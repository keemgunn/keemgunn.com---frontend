import randomstring from 'randomstring';

function SignDataPack(ip, uag) {
  const userId = randomstring.generate({
    length: 12,
    charset: 'alphanumeric'
  });
  return {
    paths:[],
    pathGroup: null,
    svg: '',
    bounds: {
      width: 0, height: 0,
      x: 0, y: 0
    },
    bbc:[0, 0, 0, 0, 0, 0],
    info: {
      userId,
      name: userId,
      ip,
      uag,
      inTime: Date.now(),
      writeTime: null
    }
  }
}

export { 
  SignDataPack,

}