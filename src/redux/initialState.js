import { storage, clone } from "../core/utilits"
import { defaultStyles,  defaultTitle } from "../constants";

const defaultlState =  {
    title: defaultTitle,
    rowState: {},
    colState: {},
    dataState: {}, //{'0:1:  dfdfgdf'}
    stylesState: {},
    currentText: '',
    currentStyles: defaultStyles,
    openedDate: new Date().toJSON()
}

const normalize  = state =>({
   ...state, 
   currentStyles: defaultStyles,
   currentText: ''

})

export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultlState);
}