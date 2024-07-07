import Request from "../Request";

const BaseServices = {
  Get: async (url) => {
    try {
      const res = await Request.Get(url);
      if (res.status === 200 || res !== null) return [null, res];
      return [res, null];
    } catch (err) {
      return [err, null];
    }
  },
  Post: async (url, params) => {
    try {
      const res = await Request.Post(url, params);
      if (res.status === 200 || res !== null) return [null, res];
      return [res, null];
    } catch (err) {
      return [err, null];
    }
  },
  Delete: async (url, params) => {
    try {
      const res = await Request.Delete(url, params);
      if (res.status === 200 || res !== null) return [null, res];
      return [res, null];
    } catch (err) {
      return [err, null];
    }
  },
  Put: async (url, params) => {
    try {
      const res = await Request.Put(url, params);
      if (res.status === 200 || res !== null) return [null, res];
      return [res, null];
    } catch (err) {
      return [err, null];
    }
  },
};

export default BaseServices;
