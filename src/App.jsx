import "./App.css";
import React, { useState } from "react";
import { Form } from "./components/Form";
import { Table } from "./components/Table";
import { postTask } from "./helpers/axiosHelper";
function App() {
  let [taskList, setTaskList] = useState([]);
  const hrsPerWeek = 24 * 7;

  const addTaskList = (taskObj) => {
    const hours = Number(taskObj.hours) || 0;
    const ttlHr = taskList.reduce((acc, item) => acc + Number(item.hours), 0);

    if (ttlHr + hours > hrsPerWeek) {
      return alert("Sorry Boss, not enough time left this week for this task.");
    }

    const obj = { ...taskObj, hours, id: randomIdGenerator(), type: "entry" };
    setTaskList([...taskList, obj]);

    //call api and send data to database

    const response = postTask(obj);
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
