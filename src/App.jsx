import "./App.css";
import React, { useState } from "react";
import { Form } from "./components/Form";

function App() {
  const [taskList, setTaskList] = useState([]);
  const addTaskList = (taskObj) => {
    const obj = {
      ...taskObj,
      id: randomIdGenerator(),
      type: "entry",
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
        <div className="row p-5">
          <div className="col bg-subtle text-center">
            {/* <!-- Entry List --> */}
            <h2>Entry List</h2>
            <table className="table table-hover table-borderless">
              <tbody id="entryList"></tbody>
            </table>
          </div>
          <div className="col bg-subtle text-center">
            {/* <!-- Bad List --> */}
            <h2>Bad List</h2>
            <table className="table table-hover table-borderless">
              <tbody id="badList"></tbody>
            </table>
            <div className="alert alert-light">
              You could have saved <span id="savedHours"></span> hrs
            </div>
          </div>
          <div className="alert alert-light">
            The total hours allocated = <span id="totalHours">0</span> hrs
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
