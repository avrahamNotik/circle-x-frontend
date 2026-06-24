import type { Player } from "../utils/commonType";
import { genericAxios } from "./genericRestApi";

const AUTH = "auth";
export async function getMe() {
  try {
    const me = await genericAxios<Player>({
      url: "players/getPlayer",
      axiosMethod: "GET",
    });
    return me;
  } catch {
    try {
      await genericAxios<Player>({
        url: `${AUTH}/loginWithRefreshToken`,
        axiosMethod: "POST",
      });

      return await genericAxios<Player>({
        url: "players/getPlayer",
        axiosMethod: "GET",
      });
    } catch {
      return null;
    }
  }
}

export async function logOut() {
  return await genericAxios({ url: `${AUTH}/logout`, axiosMethod: "POST" });
}
