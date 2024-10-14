import axios from "axios";
import { server } from "../../server";

export const getAllAppointment = () => async (dispatch) => {
  try {
    dispatch({
      type: "AllAppointmentRequest",
    });
    const { data } = await axios.get(
      `${server}/appointment/get-all-appointment`,
      { withCredentials: true }
    );
    dispatch({
      type: "AllAppointmentSuccess",
      payload: data.appointment,
    });
  } catch (error) {
    console.log("Error response:", error.response);
    dispatch({
      type: "AllAppointmentFail",
      payload: error.response.data.message,
    });
  }
};
