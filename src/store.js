import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
const animation = require('./assets/NameParade/javascripts/animation');
const ui = require('./assets/NameParade/javascripts/uiAction');
const test = require('./test/test');

//_____ userID generate
import randomstring from 'randomstring';
let userId = randomstring.generate({
  length: 12,
  charset: 'alphanumeric'
});

if(test.configs.client.signHistory){
  localStorage.history = '~~~~~SignHistoryTest~~~~~'
}

const initWriter = {
  paths:[],
  pathGroup: null,
  svg: '',
  bounds: {
    width: 0, height: 0,
    x: 0, y: 0
  },
  bbc:[0, 0, 0, 0, 0, 0],
  info: {
    userId: userId,
    name: userId,
    ip: null,
    uag: null,
    inTime: null,
    writeTime: null
  }
};

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    //__________________CONFIGS
    test: test.configs,
    winSize: { vw: null, vh: null }, 
    viewtype: null,
    sequence: 0,
    seqName: null,
    connections: 0,
    dataUrl: '',
    version: '',
    build: '',
    filesInServer: [],
    
    //__________________UI
    bbcAppear: false,
    backBlue: true,
    desColor: [],
    circleAnime: {
      blockSize: null,
      colCount: null, rowCount: null, 
      fieldWidth: null, fieldHeight: null,
      wOff: null, hOff: null,
    },
    blocks: [], blockRendered: false,
    
    //___________________ ANIME TIMING
    aniTiming: animation.timing,
    bbcTiming: {
      loadingTransition: 300 +'ms',
      loadedTransition: 400 + 'ms',
      fadeBlackTransition: 800 +'ms',
      circleVelocity: 0.4,
      hueVelocity: 0.5,
      levelVelocity: 0.1,
    },
    cellTiming: {
      mounted: 0,
      typoRendered: 0,
      paradeTitleCellCount: 0,
      paradeTitleMounted: 0,
    },

    //__________________PATHMAKER
    writer: initWriter,
    writerUndo: null,
    writerDone: false,
    signSent: false,

    //__________________RENDERER
    renderStatus: 0, 
      // 1:mounted 2:rendered 3:pending
    signsArr: [],
    signDataLoaded: false
  },

  getters: { 

    TC(state){ // Test Client
      return state.test.client
    },
    TS(state){ // Test Server
      return state.stest.server
    },

    VERSION(state){
      return state.version
    },

    BUILD(state){
      return state.build
    },

    SIGN_HISTORY(){
      if(localStorage.history){
        return localStorage.history
      }else{
        return false
      }
    },

    VIEWTYPE(state){
      if(state.winSize.vw < 550){
        if(state.winSize.vw/state.winSize.vh > 0.58){
          state.viewtype = 'small';
          return 'small'
        }else{
          state.viewtype = 'narrow';
          return 'narrow'
        }
      }else{
        if(state.winSize.vw/state.winSize.vh > 1){
          state.viewtype = 'wide';
          return 'wide'
        }else{
          state.viewtype = 'tablet';
          return 'tablet'
        }
      }
    },

    byType(state){
      return {
        _small: (state.viewtype === 'small'),
        _narrow: (state.viewtype === 'narrow'),
        _tablet: (state.viewtype === 'tablet'),
        _wide: (state.viewtype === 'wide'),
      }
    },

    SEQ(state){
      if(state.test.client.testSequence){
        return state.test.client.sequenceNow
      }else{
        return state.sequence
      }
    },

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

    FILES_IN_SERVER(state){
      return state.filesInServer
    },

    SIGNS(state){
      return state.signsArr
    },

    SIGNS_COUNT(state){
      return state.signsArr.length
    },

    RENDER_Q(state){
      if(state.renderSign.target === -1){
        return false
      }else{
        return true
      }
    },

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
    }

  },

  mutations: {

    bbcTrigger(state, bool){
      this.state.bbcAppear = bool;
    },
    setBBC(state, {comp, hue}){
      state.desColor = ui.newBBC({comp, hue});
      if(!state.writerDone){
        state.writer.bbc = state.desColor;
      }
    },

    async PUT_INITDATA(state, recieved){
      state.writer.info.ip = recieved.ip;
      state.writer.info.uag = recieved.uag;
      state.connections = recieved.connections;
      state.dataUrl = recieved.dataUrl;
      state.version = recieved.version;
      state.build = recieved.build;
      state.filesInServer = recieved.signs;
    },

    moveTo(state, sequence){
      state.sequence = sequence;
    },

    pushToSigns(state, arr){
      state.signs.push(arr);
    },
    
    UNDO_PATH(state){
      if(state.writer.paths.length){
        state.writerUndo = state.writer.paths.length - 1;
      }
    },

    pathAgain(state){
      delete localStorage.history;
      state.writer = initWriter;
      state.writer.userId = randomstring.generate({
        length: 12,
        charset: 'alphanumeric'
      });
      state.writerUndo = null;
      state.writerDone = false;
      state.signSent = false;
      state.cellTiming = {
        mounted: 0,
        typoRendered: 0,
        paradeTitleCellCount: 0,
        paradeTitleMounted: 0,
      };
      state.bbcAppear = false;
      state.backBlue = true;
      // window.location.reload();
      state.sequence = 0;
      state.renderStatus = 0;
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
      if(state.test.server.sendPaths){
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
        }
      }
      localStorage.history = userId;
    },

  },
  actions: { //==============================
    async INITIATE({commit, state}){
      console.log("==== INITIATING REQUEST ====");
      state.writer.info.inTime = Date.now();
      if(state.test.server.init){
        commit('PUT_INITDATA', {
          ip: 'data.ip-test', 
          uag: 'data.uag-test',
          connections: 8080,
          signs: test.signsArr
        });
      }else{
        const {data} = await axios.post('/nameparade/api/init', {userId});
        commit('PUT_INITDATA', data);
      }
    },

    async startSignLoad({state}){
      if(state.test.server.signLoad){
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
})