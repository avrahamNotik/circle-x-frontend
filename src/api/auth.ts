import type { Player } from "../utils/commonType";
import { genericAxios } from "./genericRestApi";

export async function getMe() {
  try {
    const me = await genericAxios<Player>("players/getPlayer", "GET");
    return me;
  } catch {
    try {
      await genericAxios<Player>("auth/loginWithRefreshToken", "POST");

      return await genericAxios<Player>("players/getPlayer", "GET");
    } catch {
      return null;
    }
  }
}
