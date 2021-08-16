import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { libraryActions } from "../store/librarySlice";
import PlanFormModal from "./PlanFormModal";

const LibraryListing = () => {
  const librarys = useSelector((state) => state.library.librarys);

  const GenerateTable = ({ data, libId }) => {
    const dispatch = useDispatch();

    const deleteHandler = (planId, libId) => {
      dispatch(libraryActions.removePlan({ planId, libId }));
    };

    return (
      <table className="" border="1" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>Plan Name</th>
            <th>Shift</th>
            <th>Amount</th>
            <th>Duration in Days</th>
            <th colSpan="2">action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((plan, key) => (
            <tr key={key}>
              <td>{plan.name}</td>
              <td>{plan.type}</td>
              <td>{plan.amount}</td>
              <td>{plan.duration}</td>
              <td>
                <PlanFormModal libId={libId} editMode={true} plan={plan} />

                <button
                  onClick={() => deleteHandler(plan.id, libId)}
                  className="btn btn-danger mx-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="">
      {librarys.map((library, key) => (
        <div key={key} className="border border-primary m-2">
          <h6 className="my-2">
            {library.name} ----
            <PlanFormModal libId={library.id} editMode={false} />
          </h6>
          <GenerateTable data={library.plans} libId={library.id} />
        </div>
      ))}
    </div>
  );
};

export default LibraryListing;
