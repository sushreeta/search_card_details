export const PrivateKeyManager = (() => {
  let instance;

  function init() {
    // Private variables
    const TOKEN =
      "eyJraWQiOiJnWlwvclBnV1RLVjBWbUFpWW52WVwvbUNaZUdxNXpHVVJDUWlpU0FUaHZyVjQ9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI3ZGUwMDlhNy0xMDdlLTQ5Y2EtOTQ2Yi1iY2UyYzMwYTI5NjQiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX0JRakFlUG1lZCIsImNsaWVudF9pZCI6IjdqOWJyOTIxYWZmMGNzcHNlNnBqaGMydnA3Iiwib3JpZ2luX2p0aSI6IjUzODllZTIzLTVkNjQtNDYwZS05OWIxLTYzZDFkM2M0YTE0ZiIsImV2ZW50X2lkIjoiZTc0MTQyYjMtNDY3ZS00ODJlLTk2ZTgtNzM3NmY5NGRkNTNiIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY5MzgwODk2MCwiZXhwIjoxNjkzODk1MzYwLCJpYXQiOjE2OTM4MDg5NjAsImp0aSI6IjMzOWYxZjkzLWNmYmUtNDc0NS04ODY0LTdiMWQwOTJhYWNjNiIsInVzZXJuYW1lIjoiN2RlMDA5YTctMTA3ZS00OWNhLTk0NmItYmNlMmMzMGEyOTY0In0.hd-QtNFRUrysdxkzIV4tZmszuc-VyIMdykEj7VqTlXhx-IrmUg9BigfzBXDjHdTewJAkxo5cKCmJ0IPewra1dTXbbn01Q83Ii-O3d8s5DktqVhGxYqqAaXClt37hzYDGsE7Z3pbiqhoPUXZISeoSdrZRcufzNPc9RzNGNW6V3W9yuF1wpX1SEMYEl-fHa7oAhqGATL_35uYvauTxpC5FrZ1fkIIFfL2tJswLTZzjSEfArDeVM8s23TsOptIa31c38VH4vWRbggEMe_I3pFNvhLem1Oa3f8Pl042WOZBC2w1PkcEAnS0mb1PrhlyoNQbM-LFad7Lo5w2UNlQxeXLkKg";
    const BASE_URL = "https://prod-api.vegapay.tech/";

    // Private methods
    function getToken(tokenName) {
      return TOKEN;
    }
    function getBaseUrl(tokenName) {
      return BASE_URL;
    }

    // Public methods
    return {
      getToken,
      getBaseUrl,
    };
  }

  return {
    getInstance: () => {
      if (!instance) {
        instance = init();
      }
      return instance;
    },
  };
})();
