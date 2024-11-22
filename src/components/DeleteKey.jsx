import { useContext } from "react";
import { AppContext } from "../App";
import DeleteIcon from './icons/DeleteIcon';

function DeleteKey() {
  const { onDelete } = useContext(AppContext);

  const deleteKey = () => {
    onDelete()
  }

  return (
    <button className="flex-1 rounded uppercase font-bold p-1 sm:p-2 h-16 text-xs tiny:text-base bg-key" aria-label="borrar letra" onClick={deleteKey}>
      <DeleteIcon />
    </button>
  )
}

export default DeleteKey