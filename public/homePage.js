'use strict';
const logoutButton = new LogoutButton();
logoutButton.action = () => {
  ApiConnector.logout((responseBody) => {
    if (responseBody.success === true) {
      location.reload();
    }
  });
};

ApiConnector.current((responseBody) => {
  if (responseBody.success === true) {
    ProfileWidget.showProfile(responseBody.data);
  }
  console.log(responseBody);
});
