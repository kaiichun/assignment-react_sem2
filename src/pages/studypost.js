import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CgDanger } from "react-icons/cg";
export default function StudyPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const plans = JSON.parse(localStorage.getItem("plans"));

    setPlans(plans);
  }, []);

  const plan = JSON.parse(localStorage.getItem("plans"));

  let planner = null;
  if (plans) {
    planner = plan.find((p) => parseInt(p.id) === parseInt(id));
  }

  if (!planner)
    return (
      <div
        style={{
          fontSize: "50px",
          display: "flex",
          justifyContent: "center",
          margin: "300px",
          color: "grey",
          opacity: "30%",
        }}
      >
        <h1>
          Not Found
          <CgDanger />
        </h1>
      </div>
    );
  const {
    title = "",
    content = "",
    startDate = "",
    endDate = "",
    startTime = "",
    endTime = "",
  } = planner;

  const deletePlanner = (id) => {
    const newPlan = plans.filter((j) => parseInt(j.id) !== parseInt(id));

    localStorage.setItem("plans", JSON.stringify(newPlan));

    setPlans(newPlan);
    navigate("/");
  };
  return (
    <div className="container mx-auto my-5">
      <div>
        <div>
          <div className="buttons text-end mb-5">
            Actions: <></>
            <Link
              to={`/manage-studies-edit/${id}`}
              className="btn btn-secondary btn-sm me-2"
            >
              <i className="bi bi-pencil"></i>
            </Link>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                deletePlanner(id);
              }}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
          <h1 className="h1 text-start">{title}</h1>
          <hr></hr>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="PostText "
          />
          <p className="mt-5 pt-5 text-muted">
            Time: {startTime}-{endTime}
            <br />
            {startDate ? new Date(startDate).toLocaleDateString() : ""}-
            {endDate ? new Date(endDate).toLocaleDateString() : ""}
          </p>
        </div>
      </div>

      <div className="text-center mt-5 ">
        <Link to="/" className="btn btn-link btn-sm">
          <i className="bi bi-arrow-left"></i> Home
        </Link>
        <Link to="/manage-studiess" className="btn btn-link btn-sm">
          Manage Study<i className="bi bi-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
}
