import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { doctorReducer } from "./reducers/doctorReducer";
import { appointmentReducer } from "./reducers/appointmentReducer";


const Store= configureStore({
    reducer:{
        user:userReducer,
        doctor :doctorReducer,
        appointment: appointmentReducer
    }
})

export default Store;