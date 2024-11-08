import {Label} from "./Label"
import {Input} from "./Input"

export const InputForm = ({ label, name, type, placeholder }) => {
    return (
      <>
        <Label htmlFor={name}>{label}</Label>
        <Input type={type} placeholder={placeholder} name={name} />
      </>
    );
  };