import { storage } from "../core/utilits"
import { defaultStyles,  defaultTitle } from "../constants";

const defaultlState =  {
    title: defaultTitle,
    rowState: {},
    colState: {},
    dataState: {}, //{'0:1:  dfdfgdf'}
    stylesState: {},
    currentText: '',
    currentStyles: defaultStyles,
}

const normalize  = state =>({
   ...state, 
   currentStyles: defaultStyles,
   currentText: ''

})

export const initialState = storage('excel-state') 
    ? normalize(storage('excel-state') )
    : defaultlState;