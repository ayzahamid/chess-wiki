import type { FC } from "react";
import GrandMasters from "./GrandMasters";
import PlayerInfo from "./PlayerInfo";

const routes = [
  {
    path: "/",
    component: GrandMasters as FC,
  },
  {
    path: "/:id",
    component: PlayerInfo as FC,
  },
];

export default routes;
