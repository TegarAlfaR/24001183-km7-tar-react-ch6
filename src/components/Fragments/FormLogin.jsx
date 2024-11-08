import { Button } from "../elements/button/Button";
import { InputForm } from "../elements/input";

export const FormLogin = () => {
  return (
    <form>
      <InputForm
        label={"email"}
        type={"email"}
        placeholder={"example@gmail.com"}
        name={"email"}
      />
      <InputForm
        label={"password"}
        type={"password"}
        placeholder={"password"}
        name={"password"}
      />
      <Button>Login</Button>
    </form>
  );
};