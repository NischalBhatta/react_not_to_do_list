import "./App.css";
import React, { useState } from "react";
import { Form } from "./components/Form";
import { Table } from "./components/Table";
import {
  deleteTask,
  fetchAllTask,
  postTask,
  updateTask,
} from "./helpers/axiosHelper";
import { useEffect } from "react";
import { useRef } from "react";
function App() {
  let [taskList, setTaskList] = useState([]);

  const [resp, setResp] = useState([]);
  const hrsPerWeek = 24 * 7;

  const shouldFetchRef = useRef(true);

  useEffect(() => {
    shouldFetchRef.current && getAllTask();
    shouldFetchRef.current = false;
  }, []);

  const addTaskList = async (taskObj) => {
    const response = await postTask(taskObj);
    setResp(response);
    getAllTask();
  };

  const getAllTask = async () => {
    //call the axiosHelper class to fetch all the task

    //mount the task data to taskList state

    const data = await fetchAllTask();

    //mount the task data to taskList state
    data?.status === "success" && setTaskList(data.tasks);
  };
  const switchTask = async (_id, type) => {
    // call the axiosHelper class to switch the task
    const response = await updateTask({ _id, type });
    if (response.status === "success") {
      //re-fetch all the task
      getAllTask();
    }
    setResp(response);
  };
  const handleDeleteButton = async (idsToDelete) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      //
      const response = await deleteTask(idsToDelete);
      console.log(response);
      setResp(response);
      getAllTask();
    }
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
