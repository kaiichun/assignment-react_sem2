import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { AiOutlineFileSearch } from "react-icons/ai";
import { FaRegAddressBook } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import { MdOutlineDangerous } from "react-icons/md";

export default function Study() {
  const [keywords, setKeywords] = useState("");
  let journalList = JSON.parse(localStorage.getItem("journal"));
  const regex = /(<([^>]+)>)/gi;

  const searchedList = useMemo(() => {
    if (!journalList) journalList = [];
    return journalList
      .filter(
        (i) =>
          i.title.toLowerCase().indexOf(keywords.toLowerCase()) >= 0 ||
          i.content
            .replace(regex, "")
            .toLowerCase()
            .indexOf(keywords.toLowerCase()) >= 0
      )
      .sort(
        (a, b) =>
          new Date(b.createDate).valueOf() - new Date(a.createDate).valueOf()
      );
  }, [journalList, keywords]);

  return (
    <div
      className="container mt-5 mx-auto"
      style={{
        maxWidth: "800px",
      }}
    >
      <InputGroup hasValidation>
        <InputGroup.Text>
          <AiOutlineFileSearch />
        </InputGroup.Text>
        <Form.Control
          type="text"
          value={keywords}
          placeholder="Type your keyword..."
          onChange={(event) => {
            setKeywords(event.target.value);
          }}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please choose a username.
        </Form.Control.Feedback>
      </InputGroup>
      <Container>
        <Row>
          {searchedList.length > 0 ? (
            searchedList.map((journal) => {
              const { id, title, content, createDate, status } = journal;
              return (
                <Col lg={4} md={6} className="mt-4 ">
                  <Link
                    to={`/journalpost/${id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      style={{
                        height: "200px",
                        width: "250px",
                        boxShadow: "16px 13px 32px 8px rgba(5,5,5,0.27)",
                      }}
                      className="MainCard"
                    >
                      <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>
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
                        </Card.Text>
                      </Card.Body>
                      <Container>
                        <Row className="mb-4 mt-4">
                          <small className="col-9 text-muted ">
                            {createDate}
                          </small>
                          <FaRegAddressBook className="col-3 fs-2" />
                        </Row>
                      </Container>
                    </Card>
                  </Link>
                </Col>
              );
            })
          ) : (
            <Col className="mt-5">
              <h1 className="text-center">
                No file enteries.
                <MdOutlineDangerous />
              </h1>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}
