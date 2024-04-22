import { useState, useEffect } from "react";
import PlayersType from "../../interfaces/players";
import { Players } from "../../api/api";
import { Table, Spin } from "antd";
import { Link } from "react-router-dom";

const GrandMasters: React.FC = () => {
  const [players, setPlayers] = useState<PlayersType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    Players.getPlayers()
      .then((data: PlayersType[]) => {
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Link to={`/${text}`}>{text}</Link>,
    },
  ];

  return (
    <>
      <div>GrandMaster</div>
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
