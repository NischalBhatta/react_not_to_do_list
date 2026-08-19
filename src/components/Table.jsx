import React, { useState } from "react";

export const Table = ({
  taskList,
  switchTask,
  handleDeleteButton,
  handleOnSelect,
  toDelete,
  entryList,
  badList,
}) => {
  const hrsPerWeek = 24 * 7;

  const ttlHr = taskList.reduce((acc, item) => {
    return acc + Number(item.hr);
  }, 0);

  return (
    <>
      <div className="row p-5">
        <div className="col bg-subtle text-center">
          {/* <!-- Entry List --> */}
          <h2>Entry List</h2>
          <hr />
          {entryList.length > 0 && (
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                value="allEntry"
                id="all-entry"
                onChange={handleOnSelect}
              />
              {""}
              <label htmlFor="all-entry">Select All</label>
              <table className="table  table-borderless">
                <tbody id="entryList">
                  {entryList.map((item, i) => {
                    return (
                      <tr className="border pb-2 " key={item?._id}>
                        <td>{i + 1}</td>
                        <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={item._id}
                            onChange={handleOnSelect}
                            checked={toDelete.includes(item?._id)}
                          />
                          {""}
                          {item.task}
                        </td>
                        <td>{item.hr}hrs</td>
                        <td className="d-flex justify-content-end">
                          <div className="">
                            <button className="btn btn-warning">
                              <i
                                className="fa-solid fa-arrow-right"
                                onClick={() => switchTask(item._id, "bad")}
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
          )}
        </div>
        <div className="col bg-subtle text-center">
          {/* <!-- Bad List --> */}
          <h2>Bad List</h2>
          <hr />
          {badList.length > 0 && (
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                value="allBad"
                id="all-bad"
                onChange={handleOnSelect}
              />
              {""}

              <label htmlFor="all-bad">Select All</label>
              <table className="table table-hover table-borderless">
                <tbody id="badList">
                  {badList.map((item, i) => (
                    <tr className="border pb-2" key={item?._id}>
                      <td>{i + 1}</td>

                      <td>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={item?._id}
                          id=""
                          onChange={handleOnSelect}
                          checked={toDelete.includes(item?._id)}
                        />
                        {""}
                        {item.task}
                      </td>
                      <td>{item.hr}hrs</td>
                      <td className="d-flex justify-content-end">
                        <div className="">
                          <button className="btn btn-warning">
                            <i
                              className="fa-solid fa-arrow-left"
                              onClick={() => switchTask(item._id, "entry")}
                            ></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="alert alert-light">
            You could have saved{" "}
            <span id="savedHours">
              {badList.reduce((acc, i) => acc + Number(i.hr), 0)}
            </span>{" "}
            hrs
          </div>
        </div>
        {toDelete.length > 0 && (
          <div className="row my-3 d-grid">
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteButton(toDelete)}
            >
              {" "}
              Delete {toDelete.length} task(s)
            </button>
          </div>
        )}
        <div className="alert alert-light">
          The total hours allocated = <span id="totalHours">{ttlHr}</span> hrs
        </div>
      </div>
    </>
  );
};
