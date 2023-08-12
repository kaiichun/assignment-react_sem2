import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RichTextEditor, Link as EditorLink } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { notifications } from "@mantine/notifications";

export default function ManageJournalAdd() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdate, setCreateDate] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("publish");
  const dateFormat = (date) => {
    return new Date(date).toLocaleString();
  };
  const now = new Date();
  const nowDate = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
  const editor = useEditor({
    extensions: [StarterKit, Underline, EditorLink, Highlight, TextAlign],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });
  const submitForm = (event) => {
    let journal = JSON.parse(localStorage.getItem("journal"));
    if (!journal) journal = [];
    if (title && content && nowDate && status) {
      journal.push({
        id: Math.floor(Math.random() * 999999),
        title: title,
        content: content,
        createDate: nowDate,
        updatedate: nowDate,
        password: password,
        status: status,
        item: "journal",
      });
      localStorage.setItem("journal", JSON.stringify(journal));
      notifications.show({
        title: "Create succesful ",
        message: "Thank You!",
        color: "green",
      });
      navigate("/manage-journals");
    } else {
      notifications.show({
        title: "Please insert the value",
        message: "Thank You!",
        color: "red",
      });
    }
  };
  return (
    <div>
      <div className="container mx-auto my-5">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h1 className="h1">Add New Journal</h1>
        </div>
        <div className="card mb-2 p-4">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              submitForm();
            }}
          >
            <div className="mb-3">
              <label htmlFor="post-title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="post-title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="post-content" className="form-label">
                What you want to study
              </label>
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
                    <RichTextEditor.Link />
                    <RichTextEditor.Unlink />
                  </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>
                <RichTextEditor.Content />
              </RichTextEditor>
              <div className="mb-3">
                <label for="journals-content" className="form-label">
                  Status
                </label>
                <select
                  className="form-control"
                  id="journals-status"
                  value={status}
                  onChange={(event) => {
                    setStatus(event.target.value);
                  }}
                >
                  <option value="publish">Publish</option>
                  <option value="private">Private</option>
                </select>
              </div>
              {status === "private" ? (
                <div className="mb-3">
                  <label for="journals-title" className="form-label">
                    Password
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="journals-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              ) : null}
              <div className="mt-2">
                <input
                  type="text"
                  className="form-control"
                  id="date-input"
                  value={nowDate}
                  hidden
                />
              </div>
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </form>
        </div>
        <div className="text-center">
          <Link to="/manage-journals" className="btn btn-link btn-sm">
            <i className="bi bi-arrow-left"></i> Back to journal
          </Link>
        </div>
      </div>
    </div>
  );
}
