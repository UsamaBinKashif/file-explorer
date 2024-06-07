import { useState } from "react";
import FileExplorer from "./components/FileExplorer";
import explorer from "./lib/explorer";
import useTraverseTree from "./hooks/user-traverse-tree";

function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode } = useTraverseTree();
  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };
  return (
    <>
      <FileExplorer
        explorer={explorerData}
        handleInsertNode={handleInsertNode}
      />
    </>
  );
}

export default App;
