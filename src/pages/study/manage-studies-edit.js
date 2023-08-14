import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { IconClock } from "@tabler/icons-react";
import { TimeInput } from "@mantine/dates";
import { DatePickerInput } from "@mantine/dates";
import { Space } from "@mantine/core";
import { notifications } from "@mantine/notifications";

export default function ManageStudiesAdd() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [createDate, setCreateDate] = useState("");

  const dateFormat = (date) => {
    return new Date(date).toLocaleString();
  };
  const now = new Date();
  const nowDate = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextAlign,
      Placeholder.configure({ placeholder: "Write your topic here..." }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const submitForm = () => {
    let plans = JSON.parse(localStorage.getItem("plans"));
    if (!plans) plans = [];
    if (title && content && startDate && endDate && startTime && endTime) {
      plans.push({
        id: Math.floor(Math.random() * 100000),
        title: title,
        content: content,
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
        createDate: nowDate,
        item: "study",
      });

      localStorage.setItem("plans", JSON.stringify(plans));
      notifications.show({
        title: "Create succesful ",
        message: "Thank You!",
        color: "green",
      });
      navigate("/manage-studies");
    } else {
      notifications.show({
        title: "Please insert the value",
        message: "Thank You!",
        color: "red",
      });
    }
  };

  return (
    <div
      className="container mt-5 mx-auto"
      style={{
        maxWidth: "800px",
      }}
    >
      <h1 className="pb-3">Add Study Planner</h1>
      <Card>
        <Card.Body>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              submitForm();
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>What's your topic for the day?</Form.Label>
              <Form.Control
                type="text"
                placeholder="Write your topic..."
                id="plan-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>What's your plan for today?</Form.Label>
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
            <div className="mt-2">
              <input
                type="text"
                className="form-control"
                id="date-input"
                value={createDate}
                hidden
              />
            </div>

            <div className="text-end mt-3">
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="text-center mt-3">
        <Link to="/manage-studies" className="btn btn-outline-dark btn-sm ms-2">
          Back to Manage Studies
          <i className="bi bi-arrow-left ms-2"></i>
        </Link>
      </div>
    </div>
  );
}
