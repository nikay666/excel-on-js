import { storage } from "../core/utilits"

const defaultlState =  {
    rowState: {},
    colState: {},
    dataState: {}, //{'0:1:  dfdfgdf'}
    currentText: ''
}


export const initialState = storage('excel-state') 
    ? storage('excel-state') 
    : defaultlState;