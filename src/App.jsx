import { useState } from "react";
import FileExplorer from "./components/FileExplorer";
import explorer from "./lib/explorer";
import useTraverseTree from "./hooks/user-traverse-tree";

function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode, deleteNode, editNode } = useTraverseTree();
  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  const handleDeleteNode = (folderId) => {
    const finalTree = deleteNode(explorerData, folderId);
    setExplorerData(finalTree);
  };

  const handleEditNode = (newName, item) => {
    const finalTree = editNode(explorerData, newName, item);
    setExplorerData(finalTree);
  };
  return (
    <>
      <FileExplorer
        explorer={explorerData}
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleEditNode={handleEditNode}
      />
    </>
  );
}

export default App;
