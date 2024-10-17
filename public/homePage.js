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

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (responseBody) => {
    if (responseBody.success === true) {
      ProfileWidget.showProfile(responseBody.data);
      moneyManager.setMessage(true, 'успех');
    } else {
      moneyManager.setMessage(false, responseBody.error);
    }
  });
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (responseBody) => {
    console.log(responseBody);
    if (responseBody.success === true) {
      ProfileWidget.showProfile(responseBody.data);
      moneyManager.setMessage(true, 'успех');
    } else {
      moneyManager.setMessage(false, responseBody.error);
    }
  });
};

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (responseBody) => {
    if (responseBody.success === true) {
      ProfileWidget.showProfile(responseBody.data);
      moneyManager.setMessage(true, 'успех');
    } else {
      moneyManager.setMessage(false, responseBody.error);
    }
  });
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((responseBody) => {
  if (responseBody.success === true) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(responseBody.data);
    moneyManager.updateUsersList(responseBody.data);
  }
});
favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (responseBody) => {
    if (responseBody.success === true) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(responseBody.data);
      moneyManager.updateUsersList(responseBody.data);
      ProfileWidget.showProfile(responseBody.data);
      favoritesWidget.setMessage(true, 'успех');
    } else {
      favoritesWidget.setMessage(false, responseBody.error);
    }
  });
};
favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (responseBody) => {
    if (responseBody.success === true) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(responseBody.data);
      moneyManager.updateUsersList(responseBody.data);
      ProfileWidget.showProfile(responseBody.data);
      favoritesWidget.setMessage(true, 'успех');
    } else {
      favoritesWidget.setMessage(false, responseBody.error);
    }
  });
};
