import { useState } from "react";
import styles from "./styles/InputForm.module.css";
import type { Priority, Category } from "../App";

interface InputFormProps {
  onAddTodo: (text: string, priority: Priority, category: Category) => void;
}

const InputForm = ({ onAddTodo }: InputFormProps) => {
  const [input, setInput] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("中");
  const [category, setCategory] = useState<Category>("その他");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    onAddTodo(input, priority, category);
    setInput("");
  };

  const isInputEmpty = input.trim() === "";

  return (
    <form className={styles.inputContainer} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Add New Task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isInputEmpty}
        >
          submit
        </button>
      </div>
      <div className={styles.optionsGroup}>
        <div className={styles.priorityGroup}>
          <label className={styles.categoryLabel}>Priority:</label>
          <label className={styles.priorityLabel}>
            <input
              type="radio"
              name="priority"
              value="高"
              checked={priority === "高"}
              onChange={() => setPriority("高")}
            />
            高
          </label>
          <label className={styles.priorityLabel}>
            <input
              type="radio"
              name="priority"
              value="中"
              checked={priority === "中"}
              onChange={() => setPriority("中")}
            />
            中
          </label>
          <label className={styles.priorityLabel}>
            <input
              type="radio"
              name="priority"
              value="低"
              checked={priority === "低"}
              onChange={() => setPriority("低")}
            />
            低
          </label>
        </div>
        <div className={styles.categoryGroup}>
          <label className={styles.categoryLabel}>Category:</label>
          <label className={styles.categoryButton}>
            <input
              type="radio"
              name="category"
              value="仕事"
              checked={category === "仕事"}
              onChange={() => setCategory("仕事")}
            />
            仕事
          </label>
          <label className={styles.categoryButton}>
            <input
              type="radio"
              name="category"
              value="プライベート"
              checked={category === "プライベート"}
              onChange={() => setCategory("プライベート")}
            />
            プライベート
          </label>
          <label className={styles.categoryButton}>
            <input
              type="radio"
              name="category"
              value="買い物"
              checked={category === "買い物"}
              onChange={() => setCategory("買い物")}
            />
            買い物
          </label>
          <label className={styles.categoryButton}>
            <input
              type="radio"
              name="category"
              value="その他"
              checked={category === "その他"}
              onChange={() => setCategory("その他")}
            />
            その他
          </label>
        </div>
      </div>
    </form>
  );
};

export default InputForm;
