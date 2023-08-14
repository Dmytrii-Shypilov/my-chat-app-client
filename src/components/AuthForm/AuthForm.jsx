
import s from "./auth-form.module.scss";

import { useRef } from "react";
import { useDispatch } from "react-redux";
import { signUpUser, logInUser } from "../../redux/user/user-operations";

import { Button } from "@mui/material";
import { TextField } from "@mui/material";

const AuthForm = () => {
  const dispatch = useDispatch();

  const name = useRef(null);
  const password = useRef(null);

  const onSignUp = () => {
    if (name && password) {
      const user = {
        name: name.current.value,
        password: password.current.value,
      };

      dispatch(signUpUser(user));
      name.current.value = '';
      password.current.value = '';
    }
  };
  
  const onLogIn = () => {
    if (name && password) {
      const user = {
        name: name.current.value,
        password: password.current.value,
      };

      dispatch(logInUser(user));
    }
  }


  return (
    <form className={s.form}>
      <fieldset className={s.fieldset}>
        <TextField
          inputRef={name}
          size="small"
          id="user"
          label="user name"
          variant="outlined"
          className={s.field}
        />
        <TextField
          inputRef={password}
          size="small"
          id="password"
          label="password"
          variant="outlined"
          type="password"
          className={s.field}
        />
      </fieldset>
      <div className={s.btnWrapper}>
        <Button onClick={onLogIn} className={s.btn} variant="contained" size="small">
          log in
        </Button>
        <Button
          onClick={onSignUp}
          className={s.btn}
          variant="contained"
          size="small"
        >
          register
        </Button>
      </div>
    </form>
  );
};

export default AuthForm;
