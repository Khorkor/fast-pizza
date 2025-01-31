import { FormEvent, useState } from "react";
import Button from "../../ui/Button";
import FormInput from "../../ui/FormInput";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useRedux";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!username) return;
    dispatch(updateName(username));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>
      <FormInput
        type="text"
        name="username"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-8 w-72"
      />

      {username !== "" && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
