const seqStates = {
  0: 'loading-init',
  1: 'loading-done',
  2: 'writer-des',
  3: 'writer-pm',
  4: 'thank=you-',
  5: 'parade-intro',
  6: 'parade-display',

};

const timing = {
  Background: {
    loadingTransition: 300 +'ms',
    loadedTransition: 400 + 'ms',
    fadeBlackTransition: 800 +'ms',
    circleVelocity: 0.4,
    hueVelocity: 0.5,
    levelVelocity: 0.1,
  },
  Title: {
    loadSpeed : 60,
    loadingTransition: 300 +'ms',
    loadedDelay: 400 +'ms',
    loadedTransition: 2000 +'ms',
    loadStop: 500,
    seq01: 2500
  },
  TitleSign: {
    beforeRender: 300,
    renderSpeed: [5, 7],
    between: 100,
    // before_seq12: 2000,
    fadeOutVelo: 500,
    seq12: 200
  },
  Writer: {
    startElements: 500,
    elAppear : 300,
    susTransition: 500 + 'ms',
    susDelay: 300 + 'ms',
    susTiming: 'cubic-bezier(0,0,0,.99)',
  },
  Pathmaker:{
    afterDoneVelocity: 0.1,

  }
  

}


export { seqStates, timing };