import { Button } from "../elements/button/Button";
import { InputForm } from "../elements/input";

export const FormRegister = () => {
  return (
    <form>
      <InputForm
        label={"Fullname"}
        type={"text"}
        placeholder={"Insert your name here"}
        name={"fullname"}
      />
      <InputForm
        label={"Email"}
        type={"email"}
        placeholder={"example@gmail.com"}
        name={"email"}
      />
      <InputForm
        label={"Password"}
        type={"password"}
        placeholder={"******"}
        name={"password"}
      />
      <InputForm
        label={"Confirm Password"}
        type={"password"}
        placeholder={"******"}
        name={"password"}
      />
      <Button>Register</Button>
    </form>
  );
};