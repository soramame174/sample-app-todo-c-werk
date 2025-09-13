import styles from "./styles/FolderList.module.css";

interface Folder {
  id: number;
  name: string;
}

interface FolderListProps {
  folders: Folder[];
  activeFolderId: number;
  setActiveFolderId: (id: number) => void;
  folderInput: string;
  setFolderInput: (text: string) => void;
  onAddFolder: () => void;
  onDeleteFolder: (id: number) => void;
}

const FolderList = ({
  folders,
  activeFolderId,
  setActiveFolderId,
  folderInput,
  setFolderInput,
  onAddFolder,
  onDeleteFolder,
}: FolderListProps) => {
  return (
    <div className={styles.folderListContainer}>
      <h3>Folders</h3>
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="New folder name"
          value={folderInput}
          onChange={(e) => setFolderInput(e.target.value)}
        />
        <button onClick={onAddFolder}>+</button>
      </div>
      <ul className={styles.folderList}>
        {folders.map((folder) => (
          <li
            key={folder.id}
            className={`${styles.folderItem} ${
              folder.id === activeFolderId ? styles.active : ""
            }`}
            onClick={() => setActiveFolderId(folder.id)}
          >
            <div className={styles.folderNameWrapper}>
              {folder.id !== 0 && (
                <span className="material-symbols-outlined">
                  {folder.id === activeFolderId ? "folder_open" : "folder"}
                </span>
              )}
              {folder.name}
            </div>
            {/* IDが0または1以外のフォルダにのみ削除ボタンを表示 */}
            {folder.id > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteFolder(folder.id);
                }}
              >
                ×
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FolderList;
