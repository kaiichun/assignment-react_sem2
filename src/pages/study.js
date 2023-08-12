import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { AiOutlineFileSearch } from "react-icons/ai";
import { GiNotebook } from "react-icons/gi";
import { MdOutlineDangerous } from "react-icons/md";

export default function Study() {
  const [keywords, setKeywords] = useState("");
  const studyList = JSON.parse(localStorage.getItem("plans"));
  const regex = /(<([^>]+)>)/gi;

  const searchedList = useMemo(() => {
    return studyList
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
  }, [studyList, keywords]);

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
            searchedList.map((study) => {
              const {
                id,
                title,
                content,
                startDate,
                endDate,
                startTime,
                endTime,
              } = study;
              return (
                <Col lg={4} md={6} className="mt-4 ">
                  <Link
                    to={`/studypost/${id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      style={{
                        height: "200px",
                        width: "250px",
                      }}
                      className="MainCard"
                    >
                      <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>
                          {content.length > 15 ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: content.slice(0, 15) + "...",
                              }}
                            />
                          ) : (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: content,
                              }}
                            />
                          )}
                        </Card.Text>
                      </Card.Body>
                      <Container>
                        <Row className="mb-3 mt-4">
                          <small className="col-9 text-muted">
                            Time: {startTime} -{endTime}
                            <br />
                            {startDate?.slice(0, 10)} -{endDate?.slice(0, 10)}
                          </small>

                          <GiNotebook className="col-3 fs-2" />
                        </Row>
                      </Container>
                    </Card>
                  </Link>
                </Col>
              );
            })
          ) : (
            <Col className="mt-5">
              <h1>
                No file enteries.
                <MdOutlineDangerous style={{ fontSize: "60px" }} />
              </h1>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}
