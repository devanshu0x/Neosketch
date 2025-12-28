import {create} from 'zustand'

export const useGroup= create((set)=>({
    selectedGroupId:null,
    changeGroup: (newId:string)=>set({selectedGroupId:newId})
}));