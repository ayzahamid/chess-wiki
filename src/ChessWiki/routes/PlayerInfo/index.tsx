import { useParams } from "react-router-dom";

const PlayerInfo: React.FC = () => {
  const { id } = useParams();
  return <div>Player Info {id}</div>;
};

export default PlayerInfo;
