import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ManageStudies() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const plans = JSON.parse(localStorage.getItem("plans"));

    setPlans(plans);
  }, []);

  const deletePlan = (id) => {
    const newPlans = plans.filter((p) => parseInt(p.id) !== parseInt(id));

    localStorage.setItem("plans", JSON.stringify(newPlans));

    setPlans(newPlans);
  };

  return (
    <div className="container mx-auto my-5">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h1 className="h1">Manage Study Planner</h1>
        <div className="text-end">
          <Link to="/manage-studies-add" className="btn btn-primary btn-sm">
            Add New Study
          </Link>
        </div>
      </div>
      <div className="card mb-2 p-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">Start Time</th>
              <th scope="col">End Time</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col" className="text-end">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {plans
              ? plans.map((plan) => {
                  const {
                    id,
                    title,
                    content,
                    startDate,
                    endDate,
                    startTime,
                    endTime,
                  } = plan;
                  return (
                    <tr key={id}>
                      <td>{title}</td>
                      {content.length > 15 ? (
                        <td
                          dangerouslySetInnerHTML={{
                            __html: content.slice(0, 15) + "...",
                          }}
                        />
                      ) : (
                        <td
                          dangerouslySetInnerHTML={{
                            __html: content,
                          }}
                        />
                      )}

                      <td>{startTime}</td>
                      <td>{endTime}</td>
                      <td>
                        {startDate
                          ? new Date(startDate).toLocaleDateString()
                          : ""}
                      </td>
                      <td>
                        {endDate ? new Date(endDate).toLocaleDateString() : ""}
                      </td>
                      <td className="text-end">
                        <div className="buttons">
                          <Link
                            to={`/manage-studies-edit/${id}`}
                            className="btn btn-secondary btn-sm me-2"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              deletePlan(id);
                            }}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
      <div className="text-center">
        <Link to="/dashboard" className="btn btn-link btn-sm">
          <i className="bi bi-arrow-left"></i> Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
