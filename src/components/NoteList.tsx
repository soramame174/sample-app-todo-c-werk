import { useState } from "react";
import styles from "./styles/NoteList.module.css";

interface Note {
  id: number;
  title: string;
  url: string;
  color: string;
}

interface NoteListProps {
  notes: Note[];
  noteTitle: string;
  setNoteTitle: (title: string) => void;
  noteUrl: string;
  setNoteUrl: (url: string) => void;
  onAddNote: () => void;
  onDeleteNote: (id: number) => void;
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const NoteList = ({
  notes,
  noteTitle,
  setNoteTitle,
  noteUrl,
  setNoteUrl,
  onAddNote,
  onDeleteNote,
  selectedColor,
  onColorChange,
}: NoteListProps) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const noteColors = [
    { name: "yellow", label: "黄色" },
    { name: "green", label: "緑色" },
    { name: "blue", label: "青色" },
    { name: "pink", label: "桃色" },
    { name: "purple", label: "紫色" },
    { name: "orange", label: "橙色" },
    { name: "white", label: "白色" },
  ];

  const handleColorChange = (color: string) => {
    onColorChange(color);
    setIsColorPickerOpen(false);
  };

  const isInputEmpty = noteTitle.trim() === "" && noteUrl.trim() === "";
  const isUrlInvalid =
    noteUrl.trim() !== "" &&
    !noteUrl.startsWith("https://") &&
    !noteUrl.startsWith("http://");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isInputEmpty) return;
    if (isUrlInvalid) {
      alert("URLは「https://」または「http://」で始まる必要があります。");
      return;
    }
    onAddNote();
  };

  const breakTextIntoLines = (text: string) => {
    const isJapanese = (str: string) =>
      /[一-龠ぁ-んァ-ヶ]/.test(str) && !/[a-zA-Z]/.test(str);
    const splitCount = isJapanese(text) ? 10 : 20;
    const lines = [];
    for (let i = 0; i < text.length; i += splitCount) {
      lines.push(text.substring(i, i + splitCount));
    }
    return lines;
  };

  const handleNoteClick = (url: string, e: React.MouseEvent) => {
    if (url) {
      e.preventDefault();
      e.stopPropagation();
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className={styles.noteListContainer}>
      <form onSubmit={handleSubmit} className={styles.noteInputGroup}>
        <input
          type="text"
          placeholder="ノートのタイトル"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL"
          value={noteUrl}
          onChange={(e) => setNoteUrl(e.target.value)}
          className={isUrlInvalid ? styles.invalidUrl : ""}
        />
        <div className={styles.colorPickerWrapper}>
          <button
            type="button"
            className={styles.colorPickerButton}
            onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
          >
            <span className={styles.buttonText}>
              {noteColors.find((c) => c.name === selectedColor)?.label}
            </span>
          </button>
          {isColorPickerOpen && (
            <div className={styles.colorDropdown}>
              {noteColors.map((color) => (
                <div
                  key={color.name}
                  className={styles.colorOption}
                  onClick={() => handleColorChange(color.name)}
                >
                  <span
                    className={`${styles.colorDot} ${styles[color.name]}`}
                  ></span>
                  <span>{color.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <button type="submit" disabled={isInputEmpty || isUrlInvalid}>
          Add
        </button>
      </form>
      {notes.length === 0 ? (
        <p className={styles.noNotesMessage}>今はありません</p>
      ) : (
        <ul className={styles.noteList}>
          {notes.map((note) => (
            <li
              key={note.id}
              className={`${styles.noteItem} ${styles[note.color]} ${
                note.url ? styles.clickableNote : ""
              }`}
              onClick={(e) => handleNoteClick(note.url, e)}
            >
              <div className={styles.noteContent}>
                <span
                  className={`${styles.noteColorDot} ${styles[note.color]}`}
                ></span>
                <p className={styles.noteText}>
                  {note.title.trim() !== ""
                    ? breakTextIntoLines(note.title).map((line, index) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))
                    : null}
                  {note.url && note.title.trim() !== "" && (
                    <span className={styles.urlIcon}>URL</span>
                  )}
                </p>
                {note.url && note.title.trim() === "" && (
                  <span className={styles.urlIconOnly}>URL</span>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteNote(note.id);
                }}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoteList;
