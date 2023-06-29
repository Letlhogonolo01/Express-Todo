import { Badge } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateStatus } from "../Redux/Slice/todo";

export default function TodoItem({id, name, isDone, createdAt, updatedAt, onClickRemove}) {
    const dispatch = useDispatch()
    const handleClick = ({id}) => {
        dispatch(updateStatus({id}))
    }

    return (
        <tr>
            <td>
                <p className={`todo-item ${isDone && "done"}`}>{name}</p>
                <Badge bg="secondary">{createdAt}</Badge>
            </td>
            <td>
                <Badge bg={isDone ? 'success' : 'danger'}>{isDone ? "Done" : "Pending"}</Badge>
                {isDone && <p>{updatedAt}</p>}
            </td>
            {!isDone && 
                <td>
                <div style={{color: "green"}} onClick={() => handleClick({id})}>
                    <FaCheck />
                </div>
            </td>
            }
            <td colSpan={isDone ? 2 : 1}>
                <div style={{color: "red"}} onClick={() => onClickRemove({id})}>
                    <FaTimes />
                </div>
            </td>
        </tr>
    )
}