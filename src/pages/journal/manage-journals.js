import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiFillLock } from "react-icons/ai";

export default function ManageJournals() {
  const [journal, setJournal] = useState([]);

  useEffect(() => {
    const newJour = JSON.parse(localStorage.getItem("journal"));

    setJournal(newJour);
  }, []);

  return (
    <div className="container mx-auto my-5" style={{ maxWidth: "700px;" }}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h1 className="h1">Manage Journals</h1>
        <div className="text-end">
          <Link to="/manage-journals-add" className="btn btn-primary btn-sm">
            Add New Journal
          </Link>
        </div>
      </div>
      <div className="card mb-2 p-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col" width="30%">
                Create Date{" "}
              </th>
              <th scope="col" width="20%">
                Title
              </th>
              <th scope="col" width="35%">
                Content
              </th>
              <th scope="col" className="text-end">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {journal
              ? journal.map((jour) => {
                  const { id, title, content, createDate, status } = jour;
                  return (
                    <tr key={id}>
                      <td> {createDate}</td>
                      <td>{title}</td>
                      {status === "private" ? (
                        <td>
                          <h3>
                            <AiFillLock />
                          </h3>
                        </td>
                      ) : (
                        <>
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
                        </>
                      )}
                      <td className="text-end me-5">
                        <Link
                          to={`/journalpost/${id}`}
                          className="btn btn-warning btn-sm me-2"
                        >
                          See All
                        </Link>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
      <div className="text-center">
        <Link to="/dashboard" className="btn btn-outline-dark btn-sm ms-2">
          Back to Dashboard<i className="bi bi-arrow-left ms-2"></i>
        </Link>
      </div>
    </div>
  );
}
