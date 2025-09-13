import { useState } from "react";
import InputForm from "./components/InputForm";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";
import FolderList from "./components/FolderList";
import NoteList from "./components/NoteList";
import "./index.css";

export type Priority = "高" | "中" | "低";
export type Category = "仕事" | "プライベート" | "買い物" | "その他";

interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
  priority: Priority;
  folderIds: number[];
  category: Category;
}

interface Note {
  id: number;
  title: string;
  url: string;
  color: string;
}

interface Folder {
  id: number;
  name: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [folders, setFolders] = useState<Folder[]>([
    { id: 0, name: "All" },
    { id: 1, name: "Inbox" },
  ]);
  const [activeFolderId, setActiveFolderId] = useState<number>(0);
  const [filter, setFilter] = useState<"All" | "Todo" | "Done">("All");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "All">("All");
  const [categoryFilter, setCategoryFilter] = useState<Category | "All">("All");
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteUrl, setNoteUrl] = useState<string>("");
  const [folderInput, setFolderInput] = useState<string>("");
  const [selectedNoteColor, setSelectedNoteColor] = useState<string>("yellow");

  const addTodo = (text: string, priority: Priority, category: Category) => {
    if (text.trim() === "") return;
    const newTodo: Todo = {
      id: Date.now(),
      text,
      isCompleted: false,
      priority,
      folderIds: [activeFolderId],
      category,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const deleteDone = () => {
    if (window.confirm("本当に完了したタスクをすべて削除しますか？")) {
      setTodos(todos.filter((todo) => !todo.isCompleted));
    }
  };

  const addFolder = () => {
    if (folderInput.trim() === "") return;
    const newFolder: Folder = {
      id: Date.now(),
      name: folderInput,
    };
    setFolders([...folders, newFolder]);
    setFolderInput("");
  };

  const deleteFolder = (id: number) => {
    if (id === 0 || id === 1) {
      alert("このフォルダは削除できません。");
      return;
    }
    if (window.confirm("本当にこのフォルダを削除しますか？")) {
      setFolders(folders.filter((folder) => folder.id !== id));
      setTodos(
        todos.map((todo) => ({
          ...todo,
          folderIds: todo.folderIds.filter((folderId) => folderId !== id),
        }))
      );
      setActiveFolderId(0);
    }
  };

  const addNote = () => {
    if (noteTitle.trim() === "" && noteUrl.trim() === "") return;

    // URLのバリデーション (簡易的なもので妥協)
    const urlPattern = /^(https?:\/\/.+)/;
    const validatedUrl = noteUrl.trim().match(urlPattern) ? noteUrl.trim() : "";

    const newNote: Note = {
      id: Date.now(),
      title: noteTitle.trim(),
      url: validatedUrl,
      color: selectedNoteColor,
    };
    setNotes([...notes, newNote]);
    setNoteTitle("");
    setNoteUrl("");
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const hasCompletedTodos = todos.some((todo) => todo.isCompleted);

  const toggleTodoFolder = (todoId: number, folderId: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoId) {
          const newFolderIds = todo.folderIds.includes(folderId)
            ? todo.folderIds.filter((id) => id !== folderId)
            : [...todo.folderIds, folderId];
          return { ...todo, folderIds: newFolderIds };
        }
        return todo;
      })
    );
  };

  const toggleTodoCategory = (todoId: number, newCategory: Category) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, category: newCategory } : todo
      )
    );
  };

  const filteredTodos = todos
    .filter((todo) =>
      activeFolderId === 0 ? true : todo.folderIds.includes(activeFolderId)
    )
    .filter((todo) => {
      const statusMatch =
        filter === "All" ||
        (filter === "Todo" && !todo.isCompleted) ||
        (filter === "Done" && todo.isCompleted);
      const priorityMatch =
        priorityFilter === "All" || todo.priority === priorityFilter;
      const categoryMatch =
        categoryFilter === "All" || todo.category === categoryFilter;
      return statusMatch && priorityMatch && categoryMatch;
    });

  return (
    <div className="todo-app-container">
      <h1>ToDo & Notes</h1>
      <div className="main-content">
        <FolderList
          folders={folders}
          activeFolderId={activeFolderId}
          setActiveFolderId={setActiveFolderId}
          folderInput={folderInput}
          setFolderInput={setFolderInput}
          onAddFolder={addFolder}
          onDeleteFolder={deleteFolder}
        />
        <div className="right-section">
          <h2>Notes</h2>
          <NoteList
            notes={notes}
            noteTitle={noteTitle}
            setNoteTitle={setNoteTitle}
            noteUrl={noteUrl}
            setNoteUrl={setNoteUrl}
            onAddNote={addNote}
            onDeleteNote={deleteNote}
            selectedColor={selectedNoteColor}
            onColorChange={setSelectedNoteColor}
          />
          <h2>Tasks</h2>
          <InputForm onAddTodo={addTodo} />
          <TaskFilter
            filter={filter}
            setFilter={setFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
          <TaskList
            todos={filteredTodos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
            allFolders={folders}
            onToggleTodoFolder={toggleTodoFolder}
            onToggleTodoCategory={toggleTodoCategory}
          />
          <button
            className="delete-all"
            onClick={deleteDone}
            disabled={!hasCompletedTodos}
          >
            <p>
              delete done{" "}
              <div className="delete-all-icon">
                <span className="material-symbols-outlined">
                  delete_forever
                </span>
              </div>
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
