import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDQwZjg0NDg4YWEyZGU0YjU2NTUwMGFiZDM5YjIxZCIsIm5iZiI6MTc1OTkzMDA5NS45MDgsInN1YiI6IjY4ZTY2NmVmYjZhMzNhNDI3MWY4NTFjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nE_xWPmz0vUxJ3QmPcJ77in3TiSspjN5DoYCihLz3vA",
  },
});

export default instance;