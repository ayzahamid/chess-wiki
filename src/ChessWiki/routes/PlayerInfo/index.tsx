import { useParams } from "react-router-dom";

const PlayerInfo: React.FC = () => {
  const { name } = useParams();
  return <div>Player Info {name}</div>;
};

export default PlayerInfo;
