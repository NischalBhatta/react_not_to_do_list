import "./App.css";
import React, { useState } from "react";
import { Form } from "./components/Form";
import { Table } from "./components/Table";
import { fetchAllTask, postTask } from "./helpers/axiosHelper";
import { useEffect } from "react";
function App() {
  let [taskList, setTaskList] = useState([]);

  const [resp, setResp] = useState([]);
  const hrsPerWeek = 24 * 7;

  useEffect(() => {
    //
    getAllTask();
  }, []);

  const addTaskList = async (taskObj) => {
    // if (ttlHr + hours > hrsPerWeek) {
    //   return alert("Sorry Boss, not enough time left this week for this task.");
    // }

    // setTaskList([...taskList, obj]);

    //call api and send data to database

    const response = await postTask(taskObj);
    setResp(response);
  };

  const getAllTask = async () => {
    //call the axiosHelper class to fetch all the task

    //mount the task data to taskList state
    const data = await fetchAllTask();
    console.log(data);

    //mount the task data to taskList state
    data?.status === "success" && setTaskList(data.tasks);
  };
  const switchTask = (id, type) => {
    setTaskList(
      taskList.map((item) => {
        if (item.id == id) {
          item.type = type;
        }
        return item;
      }),
    );
  };
  const handleDeleteButton = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      taskList = setTaskList(taskList.filter((item) => item.id !== id));
    }
  };

  // console.log(taskList);
  const randomIdGenerator = (length = 6) => {
    const str =
      "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
    let id = "";
    for (let i = 0; i < 6; i++) {
      const random = Math.floor(Math.random() * str.length);
      id += str[random];
    }
    return id;
  };
  return (
    <div className="wrapper">
      <div className="container p-5">
        {/* <!-- Title --> */}
        <h2 className="text-center p-2">Not To Do List</h2>
        {resp?.message && (
          <div
            className={
              resp?.status == "success"
                ? "alert alert-success"
                : "alert alert-danger"
            }
          >
            {resp?.message}
          </div>
        )}

        {/* <!-- Form --> */}
        <Form addTaskList={addTaskList} />

        {/* <!-- Tables --> */}
        <Table
          taskList={taskList}
          switchTask={switchTask}
          handleDeleteButton={handleDeleteButton}
        />
      </div>
    </div>
  );
}

export default App;
