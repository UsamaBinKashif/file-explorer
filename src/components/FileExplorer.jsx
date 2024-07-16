import {
  DeleteTwoTone,
  EditTwoTone,
  FileAddTwoTone,
  FileTextTwoTone,
  FolderAddTwoTone,
  FolderOpenTwoTone,
  FolderTwoTone,
} from "@ant-design/icons";
import { Button, Flex, Form, Input } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";

const mainStyles = {
  padding: "5px",
  maxWidth: "600px",
};

const inputStyles = {
  width: "150px",
  margin: "5px",
};

const FileExplorer = ({
  handleInsertNode,
  explorer,
  handleDeleteNode,
  handleEditNode,
}) => {
  const [expand, setExpand] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(explorer.name);

  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

  const handleButton = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const handleCreate = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer?.id, e.target.value, showInput.isFolder);

      setShowInput({ ...showInput, visible: false });
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();

    handleDeleteNode(explorer?.id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setEditing(true);
  };
  const handleEditChange = (e) => {
    setNewName(e.target.value);
  };

  const handleEditSubmit = (e) => {
    if (e.keyCode === 13 && newName) {
      handleEditNode(newName,explorer);
      setEditing(false);
    }
  };

  if (explorer.isFolder) {
    return (
      <main style={mainStyles}>
        <Flex
          className="folder"
          onClick={() => setExpand((prev) => !prev)}
          gap="small"
          align="center"
        >
          <p>
            {" "}
            {!expand ? (
              <FolderTwoTone twoToneColor="#FFDB00" />
            ) : (
              <FolderOpenTwoTone twoToneColor="#FFDB00" />
            )}
            {editing ? (
              <Input
                autoFocus
                value={newName}
                onChange={handleEditChange}
                onBlur={() => setEditing(false)}
                onKeyDown={handleEditSubmit}
                style={inputStyles}
              />
            ) : (
              <span style={{ margin: "0 5px" }}>{explorer?.name}</span>
            )}
          </p>
          <Button
            type="default"
            icon={<FolderAddTwoTone twoToneColor="#FFDB00" />}
            onClick={(e) => handleButton(e, true)}
          >
            Create Folder
          </Button>
          <Button
            type="default"
            icon={<FileAddTwoTone />}
            onClick={(e) => handleButton(e, false)}
          >
            Create File
          </Button>
          <Button
            type="default"
            icon={<DeleteTwoTone twoToneColor="#ff0000" />}
            onClick={(e) => handleDelete(e)}
          >
            Delete
          </Button>

          <Button
            type="default"
            icon={<EditTwoTone   twoToneColor="#416D19"/>}
            onClick={(e) => handleEdit(e)}
          >
            Edit
          </Button>
        </Flex>
        {showInput?.visible && (
          <Form>
            <Flex gap="small">
              <EditTwoTone twoToneColor="#416D19" />
              <Input
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                onKeyDown={handleCreate}
                onClick={(e) => e.stopPropagation()}
                placeholder={
                  showInput.isFolder ? "Enter Folder Name" : "Enter File Name"
                }
                style={inputStyles}
              />
            </Flex>
          </Form>
        )}
        {showInput?.visible && (
          <Form>
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <EditTwoTone twoToneColor="#416D19" />
              <Input
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                onKeyDown={handleCreate}
                placeholder={
                  showInput.isFolder ? "Enter Folder Name" : "Enter File Name"
                }
                style={inputStyles}
              />
            </div>
          </Form>
        )}
        {expand && (
          <>
            {explorer.items.map((item) => (
              <>
                <FileExplorer
                  handleDeleteNode={handleDeleteNode}
                  handleInsertNode={handleInsertNode}
                  handleEditNode={handleEditNode}
                  explorer={item}
                  key={item?.id}
                />
              </>
            ))}
          </>
        )}
      </main>
    );
  } else
    return (
      <Flex vertical gap="small">
        <Flex align="center">
          <p className="file">
            <FileTextTwoTone />
            {editing ? (
              <Input
                autoFocus
                value={newName}
                onChange={handleEditChange}
                onBlur={() => setEditing(false)}
                onKeyDown={handleEditSubmit}
                style={inputStyles}
              />
            ) : (
              <span style={{ margin: "0 5px" }}>{explorer?.name}</span>
            )}
          </p>
          <Button
            type="default"
            icon={<DeleteTwoTone twoToneColor="#ff0000" />}
            onClick={(e) => handleDelete(e)}
          >
            Delete
          </Button>
          <Button
            type="default"
            icon={<EditTwoTone  twoToneColor="#416D19" />}
            onClick={(e) => handleEdit(e)}
          >
            Edit
          </Button>
        </Flex>
      </Flex>
    );
};

export default FileExplorer;

FileExplorer.propTypes = {
  explorer: PropTypes.shape({
    key: PropTypes.string,
    id: PropTypes.string,
    isFolder: PropTypes.bool,
    name: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        isFolder: PropTypes.bool,
        items: PropTypes.array,
      })
    ),
  }),
  handleInsertNode: PropTypes.func,
  handleDeleteNode: PropTypes.func,
  handleEditNode: PropTypes.func.isRequired,

};
