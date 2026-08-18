import axios from "axios";

const apiEP = "http://localhost:8000/api/v1/tasks";

// const apiProcessor =()=>{
//     try {
//         const response = await axios({
//             method,
//             url
//         })

//     } catch (error) {
//         return {
//             status:"error",
//             message: error.message
//         }

//     }
// }

export const postTask = async (data) => {
  try {
    const response = await axios.post(apiEP, data);
    console.log(response);
    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const fetchAllTask = async () => {
  try {
    const response = await axios.get(apiEP);
    console.log(response);
    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: "error.message",
    };
  }
};
export const updateTask = async (data) => {
  try {
    const response = await axios.patch(apiEP, data);
    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: "error.message",
    };
  }
};
