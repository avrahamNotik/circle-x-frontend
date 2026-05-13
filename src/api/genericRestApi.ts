import axios from "axios";
import { type Method } from "axios";

export async function genericAxios<T>(
  url: string,
  axiosMethod: Method,
  data?: object,
  withCredentials: boolean = true,
): Promise<T> {
  console.log(`${import.meta.env.VITE_BASE_URL}${url}`);

  const res = await axios<T>(`${import.meta.env.VITE_BASE_URL}${url}`, {
    withCredentials,
    method: axiosMethod,
    data,
  });
  return res.data;
}
