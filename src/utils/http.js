import { useState, useEffect } from "react";
import { PrivateKeyManager } from "./privateVariables";
import { isObjectEmpty } from "./validations";

const prepareAPICall = ({ endPoint, method, queryParams, header, body }) => {
  const KeyManager = PrivateKeyManager.getInstance();
  // const apiKey = KeyManager.getApiKey(); //not using for now
  const token = KeyManager.getToken();
  const baseUrl = KeyManager.getBaseUrl();
  let params = "";

  // Set query params
  if (!isObjectEmpty(queryParams)) {
    params = "?";
    const _keys = Object.keys(queryParams);
    const _values = Object.values(queryParams);
    let _queryString = "";
    _keys.map((item, index) => {
      let _qString = "";
      if (_queryString.length > 1) {
        _qString = "&";
      }
      _qString = `${item.toString()}=${_values[index].toString()}`;
      _queryString = _queryString + _qString;
    });
    params = params + _queryString;
  }

  // Set headers
  let headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  };
  if (!isObjectEmpty(header)) {
    headers = { ...headers, ...header };
  }

  // Set final url
  const url = baseUrl + endPoint + params;

  const fetchParams = {
    method, // *GET, POST, PUT, DELETE, etc.
    headers,
    redirect: "follow",
  };

  // Set body
  if (!isObjectEmpty(body)) {
    fetchParams.body = JSON.stringify(body);
  }
  return { url, fetchParams };
};

export const makeApiCall = async ({
  endPoint = "",
  method = "GET",
  queryParams = {},
  header = {},
  body = {},
  setApiData = () => {},
}) => {
  // loading start
  setApiData((prev) => ({
    data: prev.data,
    error: null,
    loading: true,
  }));

  const { url, fetchParams } = prepareAPICall({
    endPoint,
    method,
    queryParams,
    header,
    body,
  });

  try {
    // API call
    const response = await fetch(url, fetchParams);
    if (!response.ok) {
      // On API failed
      throw new Error("Network response was not ok");
    }
    // On API success
    const data = await response.json();
    setApiData({
      data: data,
      error: null,
      loading: false,
    });
    // Note: below log is for developer help, need to be commtented in prduction mode as it will lead to security issue.
    console.log(
      "@API url:",
      url,
      "queryParams:",
      queryParams,
      "request body:",
      body,
      "response:",
      data
    );
    return { data: data, error: null, loading: false };
  } catch (error) {
    // On any error occur
    console.error(" @API Error fetching data:", error);
    setApiData({
      data: {},
      error: error,
      loading: false,
    });
    return { data: {}, error: error, loading: false };
  }
};

export const useHttp = ({
  endPoint,
  method = "GET",
  queryParams = {},
  header = {},
  body = {},
}) => {
  const [apiData, setApiData] = useState({
    data: {},
    error: null,
    loading: true,
  });

  const process = () => {
    makeApiCall({ endPoint, method, queryParams, header, body, setApiData });
  };

  useEffect(() => {
    process();
  }, []);

  return { ...apiData, refetch: process };
};
