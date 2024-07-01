import Request from "../Request";

const BaseServices = {
  Get: async (url) => {
    try {
      const res = await Request.Get(url);
      if (res.success) return [null, res.data];
      return [res, null];
    } catch (err) {
      return [err, null];
    }
  },
  Post: async (url, params) => {
    try {
      const res = await Request.Post(url, params);
      if (res.success) return [null, res.data];
      return [res, null];
    } catch (err) {
      return [err, null];
    }
  },
  Delete: async (url) => {
    try {
      const res = await Request.Delete(url);
      if (res.success) return [null, res.data];
      return [res, null];
    } catch (err) {
      return [err, null];
    }
  },
};

export default BaseServices;
