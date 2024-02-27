import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";

type ChangeHandler<T> = (
  event: ChangeEvent<HTMLInputElement>,
  name: keyof T
) => void;

function useInputChange<T>(initialState: T): [T, ChangeHandler<T>] {
  const [state, setState] = useState<T>(initialState);

  const handleChange: ChangeHandler<T> = (event, name) => {
    setState((prev) => ({ ...prev, [name]: event.target.value }));
  };

  return [state, handleChange];
}

export default useInputChange;
