import { useId } from "react"

const useTraverseTree = () => {
    const id = useId()
    const insertNode = (tree, folderId, item, isFolder) => {
        if (tree.id === folderId && tree.isFolder) {
            const nameExist = tree.items.some((child) => child.name === item)
            if (nameExist) {
                alert(`Item with name '${item}' already exist please use different name.`)
                return tree
            }

            tree.items.unshift({
                id: id,
                name: item,
                isFolder,
                items: []
            })

            return tree
        }
        let latestNode = [];
        latestNode = tree.items.map((ob) => {

            return insertNode(ob, folderId, item, isFolder);
        });

        return { ...tree, items: latestNode }
    }

    const deleteNode = (tree, folderId) => {
        if (!tree) return tree;

        // Check if any of the direct children should be deleted
        const updatedItems = tree.items
            .map((child) => deleteNode(child, folderId))
            .filter((child) => child !== null);

        // If the current node matches the folderId, return null to delete it
        if (tree.id === folderId) {
            return null;
        }

        return { ...tree, items: updatedItems };
    }


    return { insertNode, deleteNode }

}

export default useTraverseTree