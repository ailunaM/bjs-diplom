'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = (data) =>
  ApiConnector.login(data, (responseBody) => {
    if (responseBody.success === true) {
      location.reload();
    } else {
      userForm.setLoginErrorMessage(responseBody.error);
    }
    console.log(responseBody);
  });

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (responseBody) => {
    if (responseBody.success === true) {
      location.reload();
    } else {
      userForm.setRegisterErrorMessage(responseBody.error);
    }
    console.log(responseBody);
  });
};
