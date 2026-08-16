import React, { useState } from "react";

export const Table = ({ taskList, switchTask, handleDeleteButton }) => {
  const entryList = taskList.filter((item) => item.type === "entry");
  const badList = taskList.filter((item) => item.type == "bad");

  const hrsPerWeek = 24 * 7;

  const ttlHr = taskList.reduce((acc, item) => {
    return acc + Number(item.hours);
  }, 0);

  return (
    <div className="row p-5">
      <div className="col bg-subtle text-center">
        {/* <!-- Entry List --> */}
        <h2>Entry List</h2>
        <hr />
        <table className="table table-hover table-borderless">
          <tbody id="entryList">
            {entryList.map((item, i) => {
              return (
                <tr className="border pb-2" key={item.id}>
                  <td>{i + 1}</td>
                  <td>{item.task}</td>
                  <td>{item.hr}</td>
                  <td className="d-flex justify-content-end">
                    <div className="">
                      <button
                        className="btn btn-danger mr-2"
                        onClick={() => handleDeleteButton(item.id)}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                      <button className="btn btn-warning">
                        <i
                          className="fa-solid fa-arrow-right"
                          onClick={() => switchTask(item.id, "bad")}
                        ></i>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="col bg-subtle text-center">
        {/* <!-- Bad List --> */}
        <h2>Bad List</h2>
        <hr />
        <table className="table table-hover table-borderless">
          <tbody id="badList">
            {badList.map((item, i) => (
              <tr className="border pb-2" key={item.id}>
                <td>{i + 1}</td>
                <td>{item.task}</td>
                <td>{item.hours}hr</td>
                <td className="d-flex justify-content-end">
                  <div className="">
                    <button className="btn btn-warning">
                      <i
                        className="fa-solid fa-arrow-left"
                        onClick={() => switchTask(item.id, "entry")}
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger "
                      onClick={() => handleDeleteButton(item.id)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="alert alert-light">
          You could have saved{" "}
          <span id="savedHours">
            {badList.reduce((acc, i) => acc + Number(i.hours), 0)}
          </span>{" "}
          hrs
        </div>
      </div>
      <div className="alert alert-light">
        The total hours allocated = <span id="totalHours">{ttlHr}</span> hrs
      </div>
    </div>
  );
};
