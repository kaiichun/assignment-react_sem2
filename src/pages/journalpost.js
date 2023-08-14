import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CgDanger } from "react-icons/cg";
import { BiLeftArrowCircle } from "react-icons/bi";

export default function JournalPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [journal, setJournal] = useState([]);

  useEffect(() => {
    const journal = JSON.parse(localStorage.getItem("journal"));

    setJournal(journal);
  }, []);

  const journals = JSON.parse(localStorage.getItem("journal"));

  let jour = null;
  if (journals) {
    jour = journals.find((p) => parseInt(p.id) === parseInt(id));
  }

  if (!jour)
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
    createDate = "",
    status,
    updateDate = "",
  } = jour;
  const checkPassword = () => {
    if (password === jour.password) {
      setVisible(true);
      setShowForm(false);
    } else {
      setVisible(false);
      setShowForm(true);
    }
  };
  const deleteJour = (id) => {
    // 1. use .filter to filter out the selected post
    const newJour = journal.filter((j) => parseInt(j.id) !== parseInt(id));
    // 2. update the newJour into the storage
    localStorage.setItem("journal", JSON.stringify(newJour));
    // 3. update the state
    setJournal(newJour);
    navigate("/");
  };
  return (
    <div className="container mx-auto my-5">
      {status === "private" ? (
        <div>
          {showForm ? (
            <div className="text-end justify-content-center d-flex">
              <div className="mb-2 text-center mt-5">
                <label for="journal-title" className="form-label">
                  Enter the Password to read the journal
                </label>
                <input
                  type="password"
                  className="form-control text-center mb-3 "
                  id="journal-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />{" "}
                <button
                  className="btn btn-primary btn-sm"
                  onClick={(event) => {
                    event.preventDefault();
                    checkPassword();
                  }}
                >
                  Submit Password
                </button>
              </div>
            </div>
          ) : null}
          {visible ? (
            <div>
              <div className="buttons text-end mb-5">
                Actions: <></>
                <Link
                  to={`/manage-journals-edit/${id}`}
                  className="btn btn-secondary btn-sm me-2"
                >
                  <i className="bi bi-pencil"></i>
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    deleteJour(id);
                  }}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
              <h1 className="h1 text-start">{title}</h1>
              <hr></hr>
              <div
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
                className="PostContent"
              />
              <p className="mt-5 pt-5 text-muted">Create Date: {createDate}</p>
              <p className=" text-muted">
                {updateDate === "" ? null : <p>Edit at: {updateDate}</p>}
              </p>
            </div>
          ) : null}
        </div>
      ) : (
        <div
          className="py-3 px-4 rounded-4"
          style={{ background: "rgb(255, 255, 255, 0.5)" }}
        >
          <div className="buttons text-end mb-3">
            Actions: <></>
            <Link
              to={`/manage-journals-edit/${id}`}
              className="btn btn-secondary btn-sm me-2"
            >
              <i className="bi bi-pencil"></i>
            </Link>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                deleteJour(id);
              }}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
          <h1 className="h1 text-start">{title}</h1>
          <hr></hr>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="PostContent"
          />
          <p className="mt-5 text-muted">Create Date: {createDate}</p>
          <p className=" text-muted">
            {updateDate === "" ? null : <p>Edit at: {updateDate}</p>}
          </p>
        </div>
      )}
      <div id="jbtn" className="text-center mt-5 ">
        <Link to="/" className="btn btn-outline-dark btn-sm">
          <i className="bi bi-arrow-left"></i> Home
        </Link>
        <Link
          to="/manage-journals"
          className="btn btn-outline-dark btn-sm ms-2"
        >
          Manage Journal<i className="bi bi-arrow-right ms-2"></i>
        </Link>
      </div>
    </div>
  );
}
