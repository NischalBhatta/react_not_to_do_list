import "./App.css";
import React, { useState } from "react";
import { Form } from "./components/Form";
import { Table } from "./components/Table";
function App() {
  const [taskList, setTaskList] = useState([]);
  const addTaskList = (taskObj) => {
    const obj = {
      ...taskObj,
      id: randomIdGenerator(),
      type: "bad",
    };
    setTaskList([...taskList, obj]);
  };
  console.log(taskList);
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
        <Table taskList={taskList} />
      </div>
    </div>
  );
}

export default App;
