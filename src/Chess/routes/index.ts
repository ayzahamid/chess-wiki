import type { FC } from "react";
import GrandMasters from "./GrandMasters/GrandMasters";
import PlayerInfo from "./PlayerInfo/PlayerInfo";

const routes = [
  {
    path: "/",
    component: GrandMasters as FC,
  },
  {
    path: "player/:name",
    component: PlayerInfo as FC,
  },
];

export default routes;
