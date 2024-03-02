import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "./atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const deleteTodo = () => {
    setToDos((oldToDos) => {
      return oldToDos.filter((toDo) => toDo.id !== id);
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DONE && (
        <button onClick={onClick} name={Categories.DONE}>
          Done
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button onClick={onClick} name={Categories.TO_DO}>
          To Do
        </button>
      )}
      {category !== Categories.DOING && (
        <button onClick={onClick} name={Categories.DOING}>
          Doing
        </button>
      )}
      <button onClick={deleteTodo}>Delete</button>
    </li>
  );
}

export default ToDo;
