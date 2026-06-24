import axios, { type Method } from "axios";

interface Props {
  url: string;
  axiosMethod: Method;
  data?: object;
  withCredentials?: boolean;
}
export async function genericAxios<T>({
  url,
  axiosMethod,
  data,
  withCredentials = true,
}: Props) {
  console.log({ data });

  const res = await axios<T>(`${import.meta.env.VITE_BASE_URL}${url}`, {
    withCredentials,
    method: axiosMethod,
    data,
  });
  return res;
}
