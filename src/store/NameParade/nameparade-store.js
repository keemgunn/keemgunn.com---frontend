const axios = require('axios');

const { SignDataPack } = require('./writer');
const ui = require('./uiAction');

const test = require('./test/test');
let TEST = test.testInitiate(test);

// ============================= STATE 
const state = () => ({
  
  sequence: 0,
  
  appInfo: {
    connections: 0,
    version: '',
    build: ''
  },
  
  dataConfig: {
    dataUrl: '',
    displayArr: []
  },
  
  bbc:{
    appear: false,
    backBlue: true,
    desColor: [],
  },
  
  circleAnime: {
    blockSize: null,
    colCount: null, rowCount: null, 
    fieldWidth: null, fieldHeight: null,
    wOff: null, hOff: null,
  },
  blocks: [], 
  blockRendered: false,
  cellTiming: {
    mounted: 0,
    typoRendered: 0,
    paradeTitleCellCount: 0,
    paradeTitleMounted: 0,
  },
  
  writer: SignDataPack('-', '-'),
  writerUndo: null,
  writerDone: false,
  signSent: false,
  
  signsArr: [],
  signDataLoaded: false,
  renderStatus: 0 // 1:mounted 2:rendered 3:pending
})




// ============================= GETTERS  
const getters = {

  SIGN_HISTORY(){
    if(localStorage.history){
      return localStorage.history
    }else{
      return false
    }
  },
  
  //_____________________________________

  SEQ(state){
    if(TEST.isSeqTest){
      return TEST.SEQ
    }else{
      return state.sequence
    }
  },
  
  //_____________________________________

  bs(state){
    return state.circleAnime.blockSize;
  },
  fw(state){
    return state.circleAnime.fieldWidth;
  },
  fh(state){
    return state.circleAnime.fieldHeight;
  },
  FIELD(state){
    return {
      'width': state.circleAnime.fieldWidth +'px',
      'height': state.circleAnime.fieldHeight +'px',
      'top': state.circleAnime.wOff +'px',
      'left': state.circleAnime.hOff +'px'
    }
  },
  wOff(state){
    return state.circleAnime.wOff
  },
  hOff(state){
    return state.circleAnime.hOff
  },
  blockCounts(state){
    return {
      c: state.circleAnime.colCount,
      r: state.circleAnime.rowCount
    }
  },
  
  //_____________________________________

  CELL_TIMING(state){
    return state.cellTiming
  },
  CELL_MOUNTED(state){
    if(state.blocks.length === state.cellTiming.mounted){
      return true
    }else{
      return false
    }
  },
  TYPO_RENDERED(state){
    if(state.cellTiming.typoRendered === 22){
      return true
    }else{
      return false
    }
  },
  PARADE_TITLE_MOUNTED(state){
    if(state.cellTiming.paradeTitleMounted === state.cellTiming.paradeTitleCellCount){
      return true
    }else{
      return false
    }
  },
  
  //_____________________________________

  NEW_PATHS(state){
    return state.writer.paths.length
  },
  WRITER_DONE(state){
    if(state.test.client.writerDone){
      return true
    }else{
      return state.writerDone
    }
  },
  USER_NAME(state){
    return state.writer.info.name
  },
  SIGN_SENT(state){
    return state.signSent
  },

  //_____________________________________
  
  SIGNS_INDEX(state){
    return state.dataConfig.displayArr
  },
  SIGNS(state){
    return state.signsArr
  },
  SIGNS_COUNT(state){
    return state.signsArr.length
  },
}




// ============================= MUTATIONS
const mutations = {

  async PUT_INITDATA(state, recieved){
    state.writer.info.ip = recieved.ip;
    state.writer.info.uag = recieved.uag;
    state.dataConfig.dataUrl = recieved.dataUrl;
    state.dataConfig.displayArr = recieved.signs;
    state.appInfo.connections = recieved.connections;
    state.appInfo.version = recieved.version;
    state.appInfo.build = recieved.build;
  },

  //_____________________________________
  
  bbcTrigger(state, bool){
    state.bbc.appear = bool;
  },
  setBBC(state, {comp, hue}){
    state.bbc.desColor = ui.newBBC({comp, hue});
    if(!state.writerDone){
      state.writer.bbc = state.bbc.desColor;
    }
  },
  
  //_____________________________________
  
  moveTo(state, sequence){
    state.sequence = sequence;
  },
  
  //_____________________________________

  UNDO_PATH(state){
    if(state.writer.paths.length){
      state.writerUndo = state.writer.paths.length - 1;
    }
  },
  async SEND_PATHS(state){
    // ___________________ MAKE DATA
    state.writer.info.writeTime = Date.now();
    let pathArr = [];
    let paths = state.writer.svg.split('<path d="');
    for(var i=1; i < paths.length; i++){
      const eachPath = paths[i].split('"');
      pathArr.push(eachPath[0]);
    }
    pathArr.unshift(
      state.writer.info.name, 
      state.writer.info.writeTime, 
      state.writer.bounds.width, 
      state.writer.bounds.height, 
      state.writer.bounds.x, 
      state.writer.bounds.y,
      state.writer.bbc,
    );
    // ____________ ADD DATA TO LOCAL
    state.signsArr.push(pathArr);
    if(TEST.signSent){
      state.signSent = true;
    }else{
      // ___________________ SEND DATA
      const newSign = {
        info: state.writer.info,
        pathArr
      };
      const {data} = await axios.post('/nameparade/api/push', newSign);
        // _______________ END PROCESS
      if(data.status === 200){
        state.signSent = true;
        localStorage.history = userId;
      }
    }
  },

  pathAgain(state){
    delete localStorage.history;
    state.writer = SignDataPack(state.writer.info.ip, state.writer.info.uag);
    state.writerUndo = null;
    state.writerDone = false;
    state.signSent = false;
    state.cellTiming = {
      mounted: 0,
      typoRendered: 0,
      paradeTitleCellCount: 0,
      paradeTitleMounted: 0,
    };
    state.bbc.appear = false;
    state.bbc.backBlue = true;
    // window.location.reload();
    state.sequence = 0;
    state.renderStatus = 0;
  },
}




// ============================= ACTIONS
const actions = { 

  async INITIATE({commit, state}){
    console.log("==== INITIATING REQUEST ====");
    if(state.test.server.init){
      commit('PUT_INITDATA', {
        ip: 'data.ip-test', 
        uag: 'data.uag-test',
        connections: 777,
        signs: test.signsArr
      });
    }else{
      const {data} = await axios.post('/nameparade/api/init', {userId: state.writer.info.userId});
      commit('PUT_INITDATA', data);
    }
  },

  async startSignLoad({state}){
    if(TEST.signLoad){
      state.signsArr = test.signFiles.sort(() => {
        return Math.random() - Math.random();
      });
      state.signDataLoaded = true;
    }else{
      let res = await axios.get('/nameparade/api/sign-indexes');
      const signIndexArr = res.data.signIndexArr;
      res = await axios.post(state.dataUrl + '/get-signs', {signIndexArr});
      const signData = res.data;
      state.signsArr = signData.arg.sort(() => {
        return Math.random() - Math.random();
      });
      state.signDataLoaded = true;
    }
  }
}




export default { 
  namespaced: true,
  state, 
  getters,
  mutations,
  actions
}