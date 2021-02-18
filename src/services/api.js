export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://diaryrepo-backend.herokuapp.com/api/v1"
    : "http://localhost:5000/api/v1";

