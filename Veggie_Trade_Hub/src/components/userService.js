import axios from "axios";

const getUserFromCookie = async () => {
  try {
    const response = await axios.get("http://localhost:5001/veggie/user", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return null;
  }
};

export default getUserFromCookie;
