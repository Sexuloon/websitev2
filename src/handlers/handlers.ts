import axios from "axios";

export const userSignUp = async (phonenumber: string) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/v1/signup`, {
      phonenumber: `+91${phonenumber}`,
    });

    return response.data.message;
  } catch (error) {
    return error;
  }
};

export const verifyUser = async ({
  phonenumber,
  otp,
}: {
  phonenumber: string;
  otp: string;
}) => {
  try {
    console.log(phonenumber);
    console.log(otp);
    const response = await axios.post(`http://localhost:5000/api/v1/verify`, {
      phonenumber: `+91${phonenumber}`,
      otp: otp,
    });

    return response.data.message;
  } catch (error) {
    return error;
  }
};

export const userSignIN = async ({ phonenumber }: { phonenumber: string }) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/v1/signin`, {
      phonenumber: `+91${phonenumber}`,
    });
    return response.data.message;
  } catch (error) {
    return error;
  }
};

export const userSession = async ({
  phonenumber,
  otp,
}: {
  phonenumber: string;
  otp: string;
}) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/v1/session`, {
      phonenumber: `+91${phonenumber}`,
      otp: otp,
    });
    console.log(response);
    window.sessionStorage.setItem("Token", JSON.stringify(response.data.token));

    return response.data.message;
  } catch (error) {
    return error;
  }
};
