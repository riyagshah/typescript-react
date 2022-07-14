import React, { useState } from "react";

interface TodosInputProps {
  onClick: (value: string) => void;
}

const TodosInput = ({ onClick }: TodosInputProps) => {
  const [text, setText] = useState("");

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };

  const handleAdd = () => {
    onClick(text);
    setText("");
  };

  return (
    <div>
      <input type="text" autoFocus value={text} onChange={changeHandler} />
      <button onClick={handleAdd}>ADD</button>
    </div>
  );
};

export default TodosInput;
