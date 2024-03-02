import { useEffect } from "react";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { Categories, toDoStore } from "./store";

function TodoList() {
  const { toDos, category, selectedToDos, setCategory, selectToDo } = toDoStore(
    (state) => state
  );
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as Categories);
    // set function으로 state를 변환 했을때 위에 불러온 state가 바로 변경 되지 않는다. 확인해봐야할 부분..
    console.log(category);
    selectToDo(event.currentTarget.value as Categories);
  };

  // 저장이나 변경시 toDo state가 변할때 필터링 동시에 해줌
  useEffect(() => {
    selectToDo(category);
  }, [toDos]);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>Todo</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {selectedToDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default TodoList;
