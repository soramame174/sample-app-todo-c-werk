import styles from "./styles/TaskFilter.module.css";
import type { Priority, Category } from "../App";

interface TaskFilterProps {
  filter: "All" | "Todo" | "Done";
  setFilter: (filter: "All" | "Todo" | "Done") => void;
  priorityFilter: Priority | "All";
  setPriorityFilter: (priority: Priority | "All") => void;
  categoryFilter: Category | "All";
  setCategoryFilter: (category: Category | "All") => void;
}

const TaskFilter = ({
  filter,
  setFilter,
  priorityFilter,
  setPriorityFilter,
  categoryFilter,
  setCategoryFilter,
}: TaskFilterProps) => {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterGroup}>
        <div className={styles.statusFilterGroup}>
          <button
            className={`${styles.filterButton} ${
              filter === "All" ? styles.active : ""
            }`}
            onClick={() => setFilter("All")}
          >
            All
          </button>
          <button
            className={`${styles.filterButton} ${
              filter === "Todo" ? styles.active : ""
            }`}
            onClick={() => setFilter("Todo")}
          >
            ToDo
          </button>
          <button
            className={`${styles.filterButton} ${
              filter === "Done" ? styles.active : ""
            }`}
            onClick={() => setFilter("Done")}
          >
            Done
          </button>
        </div>
        <div className={styles.priorityFilterGroup}>
          <label className={styles.priorityLabel}>priority:</label>
          <button
            className={`${styles.priorityButton} ${
              priorityFilter === "All" ? styles.active : ""
            }`}
            onClick={() => setPriorityFilter("All")}
          >
            All
          </button>
          <button
            className={`${styles.priorityButton} ${
              priorityFilter === "高" ? styles.active : ""
            }`}
            onClick={() => setPriorityFilter("高")}
          >
            高
          </button>
          <button
            className={`${styles.priorityButton} ${
              priorityFilter === "中" ? styles.active : ""
            }`}
            onClick={() => setPriorityFilter("中")}
          >
            中
          </button>
          <button
            className={`${styles.priorityButton} ${
              priorityFilter === "低" ? styles.active : ""
            }`}
            onClick={() => setPriorityFilter("低")}
          >
            低
          </button>
        </div>
        <div className={styles.categoryFilterGroup}>
          <label className={styles.categoryLabel}>Category:</label>
          <button
            className={`${styles.categoryButton} ${
              categoryFilter === "All" ? styles.active : ""
            }`}
            onClick={() => setCategoryFilter("All")}
          >
            All
          </button>
          <button
            className={`${styles.categoryButton} ${
              categoryFilter === "仕事" ? styles.active : ""
            }`}
            onClick={() => setCategoryFilter("仕事")}
          >
            仕事
          </button>
          <button
            className={`${styles.categoryButton} ${
              categoryFilter === "プライベート" ? styles.active : ""
            }`}
            onClick={() => setCategoryFilter("プライベート")}
          >
            プライベート
          </button>
          <button
            className={`${styles.categoryButton} ${
              categoryFilter === "買い物" ? styles.active : ""
            }`}
            onClick={() => setCategoryFilter("買い物")}
          >
            買い物
          </button>
          <button
            className={`${styles.categoryButton} ${
              categoryFilter === "その他" ? styles.active : ""
            }`}
            onClick={() => setCategoryFilter("その他")}
          >
            その他
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;
