import { useForm } from "react-hook-form";
import { toDoStore } from "./store";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const { toDos, setToDos, category } = toDoStore((state) => state);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    const newToDo = { text: toDo, id: Date.now(), category };
    setToDos(newToDo);
    setValue("toDo", "");
    console.log(toDos);
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", { required: "toDo is required" })}
        placeholder="Write to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
