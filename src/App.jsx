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

  const ttlHr = taskList.reduce((acc, item) => {
    return acc + Number(item.hr);
  }, 0);

  const [toDelete, setToDelete] = useState([]);
  const entryList = taskList.filter((item) => item.type === "entry");
  const badList = taskList.filter((item) => item.type === "bad");

  const [resp, setResp] = useState([]);
  const hrsPerWeek = 24 * 7;

  const shouldFetchRef = useRef(true);

  useEffect(() => {
    shouldFetchRef.current && getAllTask();
    shouldFetchRef.current = false;
  }, []);

  const addTaskList = async (taskObj) => {
    console.log(taskObj);
    if (ttlHr + +taskObj.hr > hrsPerWeek) {
      return alert("Sorry boss, you do not have much time left in you week");
    }
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
      setToDelete([]);

      //empty the toDelete state in table.jsx
    }
  };

  const handleOnSelect = (e) => {
    // console.log(e.target.value);
    const { checked, value } = e.target;
    let tempArr = [];
    if (value === "allEntry") {
      tempArr = entryList;
    }
    if (value === "allBad") {
      tempArr = badList;
    }
    if (checked) {
      if (value === "allEntry" || value === "allBad") {
        //get all the ids only from entrylist
        const ids = tempArr.map((item) => item._id);
        const uniqueIds = [...new Set([...toDelete, ...ids])];
        setToDelete(uniqueIds);
        return;
      }
      setToDelete([...toDelete, value]);
    } else {
      if (value === "allEntry" || value === "allBad") {
        const ids = tempArr.map((item) => item._id);
        setToDelete(toDelete.filter((_id) => !ids.includes(_id)));
        return;
      }
      setToDelete(toDelete.filter((_id) => _id !== value));
    }
    console.log(checked, value);
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
          toDelete={toDelete}
          handleOnSelect={handleOnSelect}
          entryList={entryList}
          badList={badList}
        />
      </div>
    </div>
  );
}

export default App;
