import axios from "axios";
import cookie from "react-cookies";
import Common from "./Common";

const apiUrl = "https://localhost:7280/api/v1";
var token = cookie.load("token");

const instance = axios.create({ baseURL: apiUrl });
instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
instance.defaults.headers.common["Content-Type"] =
  "application/json; charset=utf-8";

//home api
const CancelToken = axios.CancelToken;
let cancel;
var Request = {
  API_URL: apiUrl,
  Get: function (url) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, {
          cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
          }),
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            Common.RemoveToken();
            window.location.href = "/login?redirect=" + window.location.href;
          } else if (error.response && error.response.status === 302) {
            window.location.href = "/confirm-email";
          } else if (error.response && error.response.status === 403) {
            window.location.href = "/access-denied";
          } else if (error.response && error.response.status === 406) {
            window.location.href = "/not-acceptable";
          } else if (error.response) {
            reject(error.response.data);
          }
        });
    });
  },

  async GetAsync(url, data) {
    var result = await instance.get(url, data);
    return result;
  },
  Post: function (url, data) {
    return new Promise((resolve, reject) => {
      instance
        .post(url, data, {
          cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
          }),
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            Common.RemoveToken();
            window.location.href = "/login?redirect=" + window.location.href;
          } else if (error.response && error.response.status === 302) {
            window.location.href = "/confirm-email";
          } else if (error.response && error.response.status === 403) {
            window.location.href = "/access-denied";
          } else if (error.response && error.response.status === 406) {
            window.location.href = "/not-acceptable";
          } else if (error.response) {
            reject(error.response.data);
          }
        });
    });
  },
  async PostAsync(url, data) {
    var result = await instance.post(url, data);
    return result;
  },
  Put: function (url, data) {
    return new Promise((resolve, reject) => {
      instance
        .put(url, data, {
          cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
          }),
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            Common.RemoveToken();
            window.location.href = "/login?redirect=" + window.location.href;
          } else if (error.response && error.response.status === 403) {
            window.location.href = "/access-denied";
          } else if (error.response) {
            reject(error.response.data);
          }
        });
    });
  },

  Delete: function (url, params) {
    return new Promise((resolve, reject) => {
      instance
        .delete(url, params, {
          cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
          }),
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            Common.RemoveToken();
            window.location.href = "/login?redirect=" + window.location.href;
          } else if (error.response && error.response.status === 403) {
            window.location.href = "/access-denied";
          } else if (error.response) {
            reject(error.response.data);
          }
        });
    });
  },
};
export default Request;
