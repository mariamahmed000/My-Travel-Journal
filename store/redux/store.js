import { configureStore } from "@reduxjs/toolkit";
import destinationReducer from "./Destination";

export const store = configureStore({
    reducer:{
        destination:destinationReducer,
        
    },
    
});