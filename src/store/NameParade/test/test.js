const seqStates = {
  0: 'loading-init',
  1: 'loading-done',
  2: 'writer-pm',
  3: 'writer-ig',
  4: 'parade-intro',
};

const configs = {
  client: { 
    sequenceNow: ( 4 ),
    // testSequence: true, 
    // signHistory: true,
    // writerDone: true,
  },
  server: {
    // init: true,
    // filesInServer: true,
    // signLoad: true,
    // sendPaths: true,
    foo: 'bar',
  },
  // modal: true,
}

function testInitiate(state){
  let output = {}
  if(configs.client.signHistory){
    localStorage.history = 'SignHistoryTest'
  }
  if(configs.client.testSequence){
    state.sequence = configs.client.sequenceNow;
  }
  if(configs.client.writerDone){
    state.writerDone = true
  }
  if(configs.server.sendPaths){
    output.signSent = true;
  }
  if(configs.server.init){
    output.init = true;
  }
  if(configs.server.signLoad){
    output.signLoad = true;
  }


  return output
}

import signTest0 from './newSigns/0.json';
import signTest1 from './newSigns/1.json';
import signTest2 from './newSigns/2.json';
import signTest3 from './newSigns/3.json';
import signTest4 from './newSigns/4.json';
import signTest5 from './newSigns/5.json';
const signsArr = [0 ,1, 2, 3, 4, 5];
const signFiles = [
  signTest0, 
  signTest1,
  signTest2,
  signTest3,
  signTest4,
  signTest5
];

export { 
  configs,
  testInitiate,
  seqStates,
  signsArr,
  signFiles,
};