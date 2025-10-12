import axios from "../utils/axios";

export async function fetchTrending(filters, page) {
  const { category, duration } = filters;
  const { data } = await axios.get(
    `trending/${category}/${duration}?page=${page}`,
  );
  return data.results;
}

export async function fetchPopular(filters, page) {
  const { category } = filters;
  const { data } = await axios.get(`/${category}/popular?page=${page}`);
  return data.results;
}

export async function fetchMovie(filters, page) {
  const { category } = filters;
  const { data } = await axios.get(`/movie/${category}?page=${page}`);
  return data.results;
}

export async function fetchTv(filters, page) {
  const { category } = filters;
  const { data } = await axios.get(`/tv/${category}?page=${page}`);
  return data.results;
}

export async function fetchPeople(filters, page) {
  const { data } = await axios.get(`/person/popular?page=${page}`);
  console.log(data);

  return data.results;
}
