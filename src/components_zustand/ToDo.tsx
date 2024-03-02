import { Categories, IToDo, toDoStore } from "./store";

function ToDo({ text, category, id }: IToDo) {
  const { toDos, changeToDo, deleteToDo } = toDoStore((state) => state);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    const newToDo = { text, id, category: name as any };
    const targetIndex = toDos.findIndex((toDo) => toDo.id === id);
    changeToDo(targetIndex, newToDo);
  };

  const deleteTodo = () => {
    deleteToDo(id);
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
