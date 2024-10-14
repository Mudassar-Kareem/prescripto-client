import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  appointment: null,
};

export const appointmentReducer = createReducer(initialState, (builder) => {
  builder

    // get all appointment
    .addCase("AllAppointmentRequest", (state) => {
      state.loading = true;
    })
    .addCase("AllAppointmentSuccess", (state, action) => {
      state.loading = false;
      state.appointment = action.payload;
    })
    .addCase("AllAppointmentFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
