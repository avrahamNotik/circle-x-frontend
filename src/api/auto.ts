import axios from "axios";
import type { Player } from "../utils/commonType";

export async function getMe() {
  try {
    const me = await axios.get<Player>(
      `http://localhost:3000/players/getPlayer`,
      {
        withCredentials: true,
      },
    );
    return me.data;
  } catch {
    try {
      const refresh = await axios.post(
        `http://localhost:3000/auto/loginWithRefreshToken`,
        { withCredentials: true },
      );
      if (refresh) {
        const me = await axios.post<Player>(
          `http://localhost:3000/players/getPlayer`,
          {
            withCredentials: true,
          },
        );
        return me.data;
      }
    } catch {
      return null;
    }
  }
}
