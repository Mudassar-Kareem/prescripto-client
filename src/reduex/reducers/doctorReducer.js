import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isDoctor: false,
  doctor:null,
  doctors:[]
};

export const doctorReducer = createReducer(initialState, (builder) => {
  builder
    // load doctor reducer
    .addCase("LoadDoctorRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadDoctorSuccess", (state, action) => {
      state.isDoctor = true;
      state.loading = false;
      state.doctor = action.payload;
    })
    .addCase("LoadDoctorFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // get all doctors
    .addCase("AllDoctorRequest", (state) => {
        state.loading = true;
      })
      .addCase("AllDoctorSuccess", (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase("AllDoctorFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
