import React, { useState } from "react";

export const Form = ({ addTaskList }) => {
  const [form, setForm] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    addTaskList(form);
  };
  return (
    <form
      id="form"
      className="form shadow border p-5 rounded"
      onSubmit={handleOnSubmit}
      action="javascript:void(0)"
    >
      <div className="row">
        <div className="col-7">
          <input
            type="text"
            className="form-control"
            placeholder="task"
            aria-label="task"
            name="task"
            id="task"
            required
            onChange={handleOnChange}
          />
        </div>
        <div className="col-2">
          <input
            type="number"
            className="form-control"
            placeholder="4"
            aria-label="Last name"
            name="hr"
            id="hr"
            min="1"
            max="100"
            required
            onChange={handleOnChange}
          />
        </div>
        <div className="col-3 d-grid">
          <button className="btn btn-primary">Add New Task</button>
        </div>
      </div>
    </form>
  );
};
