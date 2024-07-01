export const RequestDomain = {
  APIUrl: () => {
    return process.env.NODE_ENV === "production"
      ? "https://localhost:7093"
      : "https://localhost:7093";
  },
  AdminUrl: () => {
    return process.env.NODE_ENV === "production"
      ? "https://localhost:7000"
      : "https://localhost:7000";
  },
};
