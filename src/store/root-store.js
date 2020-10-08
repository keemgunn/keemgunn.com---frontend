const state = () => ({
  winSize: { vw: null, vh: null }, 
  viewtype: null
})


const getters = {
  VW(state){
    return state.winSize.vw
  },
  VH(state){
    return state.winSize.vh
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
}

export default { state, getters }