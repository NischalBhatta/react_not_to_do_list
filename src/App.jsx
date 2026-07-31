import "./App.css";
import React, { useState } from "react";
import { Form } from "./components/Form";
import { Table } from "./components/Table";
function App() {
  const [taskList, setTaskList] = useState([]);
  const addTaskList = (taskObj) => {
    const obj = {
      ...taskObj,
      hours: Number(taskObj.hours) || 0,
      id: randomIdGenerator(),
      type: "entry",
    };
    setTaskList([...taskList, obj]);
    console.log(taskList);
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
