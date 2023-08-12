import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Link, useParams, useNavigate } from "react-router-dom";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { IconClock } from "@tabler/icons-react";
import { TimeInput } from "@mantine/dates";
import { Space } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

export default function EditStudyPlanner() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [plan, setPlan] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    const plans = JSON.parse(localStorage.getItem("plans"));

    const plan = plans
      ? plans.find((p) => parseInt(p.id) === parseInt(id))
      : null;

    if (plan) {
      setPlan(plan);
      setTitle(plan.title);
      setContent(plan.content);
      setStartTime(plan.startTime);
      setEndTime(plan.endTime);
      setStartDate(new Date(plan.startDate));
      setEndDate(new Date(plan.endDate));
    }
  }, []);

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Underline,
        Highlight,
        TextAlign,
        Placeholder.configure({
          placeholder: "Edit your plans here...",
        }),
      ],
      content: plan.content,
      onUpdate: ({ editor }) => {
        setContent(editor.getHTML());
      },
    },
    [plan]
  );

  const updatePlan = () => {
    const plans = JSON.parse(localStorage.getItem("plans"));

    const newPlans = plans.map((p) => {
      if (parseInt(p.id) === parseInt(id)) {
        p.title = title;
        p.content = content;
        p.startTime = startTime;
        p.endTime = endTime;
        p.startDate = startDate;
        p.endDate = endDate;

        let syear = startDate.getFullYear();
        let smonth = startDate.getMonth() + 1;
        let sday = startDate.getDate();
        let supdatedDate = new Date(`${syear}-${smonth}-${sday}`);
        supdatedDate.setHours(11, 5);

        p.startDate = supdatedDate;

        let eyear = endDate.getFullYear();
        let emonth = endDate.getMonth() + 1;
        let eday = endDate.getDate();
        let eupdatedDate = new Date(`${eyear}-${emonth}-${eday}`);
        eupdatedDate.setHours(11, 5);

        p.endDate = eupdatedDate;
      }
      return p;
    });

    localStorage.setItem("plans", JSON.stringify(newPlans));

    navigate("/manage-studies");
  };
  return (
    <div
      className="container mt-5 mx-auto"
      style={{
        maxWidth: "800px",
      }}
    >
      <h1 className="pb-3">Edit Study Planner</h1>
      <Card>
        <Card.Body>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              updatePlan();
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>What topic you want to change to?</Form.Label>
              <Form.Control
                type="text"
                placeholder="Write your topic..."
                id="plan-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Change plans?</Form.Label>
              <RichTextEditor editor={editor}>
                <RichTextEditor.Toolbar sticky stickyOffset={60}>
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Highlight />
                    <RichTextEditor.Code />
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                    <RichTextEditor.Blockquote />
                    <RichTextEditor.Hr />
                    <RichTextEditor.BulletList />
                    <RichTextEditor.OrderedList />
                  </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>
                <RichTextEditor.Content />
              </RichTextEditor>
            </Form.Group>

            <div style={{ display: "flex" }}>
              <TimeInput
                label="Start time"
                icon={<IconClock size="1rem" stroke={1.5} />}
                maw={400}
                mx="end"
                id="start-time"
                value={startTime}
                onChange={(event) => {
                  setStartTime(event.target.value);
                }}
              />
              <Space w="xl" />
              <TimeInput
                label="End time"
                icon={<IconClock size="1rem" stroke={1.5} />}
                maw={400}
                mx="end"
                id="end-time"
                value={endTime}
                onChange={(event) => {
                  setEndTime(event.target.value);
                }}
              />
            </div>
            <div style={{ display: "flex" }}>
              <DatePickerInput
                value={startDate}
                onChange={(newStart) => {
                  setStartDate(newStart);
                }}
                label="Start Date"
                placeholder="Start Date"
                maw={400}
                mx="end"
                w={115}
              />
              <Space w="xl" />

              <DatePickerInput
                value={endDate}
                onChange={(newEnd) => {
                  setEndDate(newEnd);
                }}
                label="End Date"
                placeholder="End Date"
                maw={400}
                mx="end"
                w={115}
              />
            </div>

            <div className="text-end mt-3">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="text-center mt-3">
        <Link to="/manage-studies">
          <i className="bi bi-box-arrow-in-left me-2"></i>Back to Manage Planner
        </Link>
      </div>
    </div>
  );
}
