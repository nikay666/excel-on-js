import { storage } from "../core/utilits"

const defaultlState =  {
    rowState: {},
    colState: {}
}

export const initialState = storage('excel-state') 
    ? storage('excel-state') 
    : defaultlState;