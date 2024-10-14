import axios from "axios";
import { server } from "../../server";

export const loadDoctor = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadDoctorRequest",
    });
    const { data } = await axios.get(`${server}/doctor/load-doctor`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadDoctorSuccess",
      payload: data.doctor,
    });
  } catch (error) {
    console.log("Error response:", error.response);
    dispatch({
      type: "LoadDoctorFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllDoctor = () => async (dispatch) => {
  try {
    dispatch({
      type: "AllDoctorRequest",
    });
    const { data } = await axios.get(`${server}/doctor/all-doctor`);
    dispatch({
      type: "AllDoctorSuccess",
      payload: data.doctor,
    });
  } catch (error) {
    console.log("Error response:", error.response);
    dispatch({
      type: "AllDoctorFail",
      payload: error.response.data.message,
    });
  }
};
