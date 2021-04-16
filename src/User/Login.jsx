import React, { useContext } from 'react';

import Card from '../Shared/Components/UIElements/Card';
import Input from '../Shared/Components/FormElements/Input';
import Button from '../Shared/Components/FormElements/Button';
import LoadingSpinner from '../Shared/Components/UIElements/LoadingSpinner';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_REQUIRE
} from '../Shared/Utils/Validators';
import { useForm } from '../Shared/hooks/form-hook';
import { useHttpClient } from '../Shared/hooks/http-hook';
import { AuthContext } from '../Shared/Context/auth_context';
import { CSSTransition } from "react-transition-group";
import './Login.css';

const Login = () => {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      dni: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );


  const authSubmitHandler = async event => {
    event.preventDefault();

      try {
        const responseData = await sendRequest(
          'https://back-dona.herokuapp.com/users/login',
          'POST',
          JSON.stringify({
            dni: formState.inputs.dni.value,
            cellphone: Number(formState.inputs.password.value)
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        auth.login(responseData._id, responseData.token);
      } catch (e) {
        // console.log(e);
      }
  };

  return (
    <React.Fragment>
    <CSSTransition
        in={true}
        mountOnEnter
        unmountOnExit
        appear={true}
        timeout={800}
        classNames="fade"
      >

      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Inicio de Sesión</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          <Input
            element="input"
            id="dni"
            type="dni"
            name="dni"
            label="dni"
            validators={[VALIDATOR_MINLENGTH(8),VALIDATOR_MAXLENGTH(11)]}
            errorText="Ingrese su DNI"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            name="password"
            type="password"
            label="Número telefónico"
            validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(6),VALIDATOR_MAXLENGTH(11)]}
            errorText="Ingrese su contraseña, es su número telefónico"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid} style={{marginTop:40, width:"95%"}}>
            Iniciar Sesión
          </Button>
        </form>
      </Card>
    
      </CSSTransition>
    </React.Fragment>
  );
};

export default Login;
