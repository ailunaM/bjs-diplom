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
function getCurrentStocks() {
  const ratesBoard = new RatesBoard();
  ApiConnector.getStocks((responseBody) => {
    if (responseBody.success === true) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(responseBody.data);
    }
  });
}
setInterval(getCurrentStocks, 1000);
