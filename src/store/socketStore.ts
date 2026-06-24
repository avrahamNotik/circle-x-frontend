import { create } from "zustand";
import { socket } from "../lib/socket";

interface SocketStoreType {
  connected: boolean;
  connect: () => void;
  disconnect: () => void;
}

export const useSocketStore = create<SocketStoreType>((set) => ({
  connected: false,
  connect: () => {
    socket.off("connect");
    socket.off("disconnect");

    socket.on("connect", () => {
      set({ connected: true });
      console.log("conect", { "socket id": socket.id });
    });

    socket.on("disconnect", () => {
      set({ connected: false });
      console.log("disconect", { "socket id": socket.id });
    });
    socket.connect();
  },

  disconnect: () => {
    socket.disconnect();
    set({ connected: false });
  },
}));
