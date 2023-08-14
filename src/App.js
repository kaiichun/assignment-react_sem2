import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import JournalPost from "./pages/journalpost";
import StudyPost from "./pages/studypost";
import ManageJournals from "./pages/journal/manage-journals";
import ManageJournalsAdd from "./pages/journal/manage-journals-add";
import ManageJournalsEdit from "./pages/journal/manage-journals-edit";
import ManageStudies from "./pages/study/manage-studies";
import ManageStudiesAdd from "./pages/study/manage-studies-add";
import ManageStudiesEdit from "./pages/study/manage-studies-edit";
import Study from "./pages/study";
import Journal from "./pages/journal";

function App() {
  return (
    <Router>
      <div>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand>SJKC</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link>
                  <Link
                    to="/"
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    Home
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    to="/study"
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    Study
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    to="/journal"
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    Journal
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    to="/dashboard"
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    Dashboard
                  </Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/journalpost/:id" element={<JournalPost />} />
            <Route path="/studypost/:id" element={<StudyPost />} />
            <Route path="/manage-journals" element={<ManageJournals />} />
            <Route
              path="/manage-journals-add"
              element={<ManageJournalsAdd />}
            />
            <Route
              path="/manage-journals-edit/:id"
              element={<ManageJournalsEdit />}
            />
            <Route path="/manage-studies" element={<ManageStudies />} />
            <Route path="/manage-studies-add" element={<ManageStudiesAdd />} />
            <Route
              path="/manage-studies-edit/:id"
              element={<ManageStudiesEdit />}
            />
            <Route path="/study" element={<Study />} />
            <Route path="/journal" element={<Journal />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
