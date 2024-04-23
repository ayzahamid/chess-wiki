import { useState, useEffect } from "react";
import PlayersType from "../../interfaces/players";
import { Players } from "../../api/chessApi";
import { Table, Spin, Typography } from "antd";
import { Link } from "react-router-dom";
import './styles.less'
const { Title } = Typography;

const GrandMasters: React.FC = () => {
  const [players, setPlayers] = useState<{ key: number; name: string }[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    Players.getPlayers()
      .then((data: PlayersType) => {
        const formattedData = data.players.map(
          (username: string, index: number) => ({
            key: index,
            name: username,
          }),
        );
        setPlayers(formattedData);
      })
      .catch((err: Error) => {
        console.log("Error", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "Names",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Link className="playerLinks" to={`player/${text}`}>{text}</Link>,
    },
  ];

  return (
    <>
      <Title className="grandMaster">Grand Masters</Title>
      <Table
        dataSource={players}
        columns={columns}
        loading={{
          spinning: isLoading,
          indicator: <Spin size="large" />,
        }}
      />
    </>
  );
};

export default GrandMasters;
