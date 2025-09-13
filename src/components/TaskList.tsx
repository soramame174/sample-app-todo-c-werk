import { useState } from "react";
import styles from "./styles/TaskList.module.css";
import type { Priority, Category } from "../App";

interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
  priority: Priority;
  folderIds: number[];
  category: Category;
}

interface Folder {
  id: number;
  name: string;
}

interface TaskListProps {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  allFolders: Folder[];
  onToggleTodoFolder: (todoId: number, folderId: number) => void;
  onToggleTodoCategory: (todoId: number, category: Category) => void;
}

const TaskList = ({
  todos,
  onToggleTodo,
  onDeleteTodo,
  allFolders,
  onToggleTodoFolder,
  onToggleTodoCategory,
}: TaskListProps) => {
  const [showFolderDropdown, setShowFolderDropdown] = useState<number | null>(
    null
  );
  const [showCategoryDropdown, setShowCategoryDropdown] = useState<
    number | null
  >(null);

  const getPriorityClass = (priority: Priority) => {
    switch (priority) {
      case "高":
        return styles.highPriority;
      case "中":
        return styles.mediumPriority;
      case "低":
        return styles.lowPriority;
      default:
        return "";
    }
  };

  const handleFolderDropdownToggle = (todoId: number) => {
    setShowFolderDropdown(showFolderDropdown === todoId ? null : todoId);
    setShowCategoryDropdown(null);
  };

  const handleCategoryDropdownToggle = (todoId: number) => {
    setShowCategoryDropdown(showCategoryDropdown === todoId ? null : todoId);
    setShowFolderDropdown(null);
  };

  const handleCategoryChange = (todoId: number, newCategory: Category) => {
    onToggleTodoCategory(todoId, newCategory);
    setShowCategoryDropdown(null);
  };

  const categoryOptions: Category[] = [
    "仕事",
    "プライベート",
    "買い物",
    "その他",
  ];

  return (
    <>
      {todos.length === 0 ? (
        <div className={styles.emptyTaskList}>
          <p>タスクを追加してください</p>
        </div>
      ) : (
        <ul className={styles.todoList}>
          {todos.map((todo) => (
            <li key={todo.id} className={styles.todoItem}>
              <div className={styles.itemLeft}>
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => onToggleTodo(todo.id)}
                />
                <span
                  className={`${styles.priorityTag} ${getPriorityClass(
                    todo.priority
                  )}`}
                >
                  {todo.priority}
                </span>

                <div className={styles.categoryDropdownContainer}>
                  <button
                    className={styles.categoryButton}
                    onClick={() => handleCategoryDropdownToggle(todo.id)}
                  >
                    {todo.category}
                  </button>
                  {showCategoryDropdown === todo.id && (
                    <div className={styles.categoryDropdown}>
                      {categoryOptions.map((category) => (
                        <button
                          key={category}
                          className={styles.categoryOption}
                          onClick={() =>
                            handleCategoryChange(todo.id, category)
                          }
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <span
                  className={`${todo.isCompleted ? styles.completed : ""} ${
                    todo.text.length > 17 ? styles.scrollableText : styles.Text
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <div className={styles.itemRight}>
                <div className={styles.folderDropdownContainer}>
                  <button
                    className={styles.folderButton}
                    onClick={() => handleFolderDropdownToggle(todo.id)}
                  >
                    フォルダ
                  </button>
                  {showFolderDropdown === todo.id && (
                    <div className={styles.folderDropdown}>
                      {allFolders
                        .filter((f) => f.id !== 0)
                        .map((folder) => (
                          <label
                            key={folder.id}
                            className={styles.folderCheckboxLabel}
                          >
                            <input
                              type="checkbox"
                              checked={todo.folderIds.includes(folder.id)}
                              onChange={() =>
                                onToggleTodoFolder(todo.id, folder.id)
                              }
                            />
                            {folder.name}
                          </label>
                        ))}
                    </div>
                  )}
                </div>
                <button
                  className={styles.deleteButton}
                  onClick={() => onDeleteTodo(todo.id)}
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default TaskList;
