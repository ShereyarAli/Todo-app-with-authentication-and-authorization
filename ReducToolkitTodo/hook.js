

// const requestToBackend = async (url,method, body) => {
//   const res = await fetch(url,
//     {
//       redirect: "follow",
//       method: method,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: body
//     })
//     console.log(res)
//   const data = await res.json()
//   console.log(data)
// }
// export default requestToBackend




import axios from "axios";
import { store } from "./src/app/store";
import { setLoading } from "./src/features/todo/todoSlice";
import { useSelector } from "react-redux";

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  store.dispatch(setLoading(true));
  return config;
}, function (error) {
  store.dispatch(setLoading(false));
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  store.dispatch(setLoading(false));
  return response;
}, function (error) {
  store.dispatch(setLoading(false));
  return Promise.reject(error);
});
const token = localStorage.getItem('jwtToken')

export const updateDBPost = async (payload, token) => {
  try {
    const res = await axios.post(
      import.meta.env.VITE_BASE_URL,
      {
        payload,
        auth: token
      },
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
    if (res.status >= 200 && res.status < 400) {
      return res.data;
    }

    throw res.data.error;
  } catch (err) {
    throw err?.response?.data?.error || err;
  }
};

export const updateDbGet = async (token, userRole, adminTask) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}?token=${token}&role=${userRole}&adminTask=${adminTask}`);
  console.log(res);
  if (res.status >= 200 && res.status < 400) {
    return res.data;
  }

  throw res.data.error;
};