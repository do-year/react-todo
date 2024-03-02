import { useState } from "react";
import { useForm } from "react-hook-form";

/* function TodoList() {
  const [todo, setTodo] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTodo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(todo);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={todo} placeholder="Write to do" />
        <button>Add</button>
      </form>
    </div>
  );
} */

interface IForm {
  email: string;
  userName: string;
  passWord: string;
  passWord2: string;
  extraError?: string;
}

function LogIn() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    if (data.passWord !== data.passWord2) {
      setError(
        "passWord2",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    }
    console.log(data);

    //setError("extraError", { message: "Server offline" });
  };

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
              message: "Invalid email pattern",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message as string}</span>
        <input
          {...register("userName", {
            required: "Username is required",
            validate: {
              noPig: (value) =>
                value.includes("pig") ? "no pig allowed" : true,
              noCow: (value) =>
                value.includes("cow") ? "no cow allowed" : true,
            },
          })}
          placeholder="Username"
        />
        <span>{errors?.userName?.message as string}</span>
        <input
          {...register("passWord", {
            required: "Password is required",
            minLength: { value: 8, message: "Password is to short" },
          })}
          placeholder="Password"
        />
        <span>{errors?.passWord?.message as string}</span>
        <input
          {...register("passWord2", {
            required: "Password2 is required",
            minLength: { value: 8, message: "Password2 is to short" },
          })}
          placeholder="Password2"
        />
        <span>{errors?.passWord2?.message as string}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message as string}</span>
      </form>
    </div>
  );
}

export default LogIn;
