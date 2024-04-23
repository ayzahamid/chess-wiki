import React, { useState, useEffect } from "react";
import PlayersType from "../../interfaces/players";
import { Players } from "../../api/chessApi";
import { Table, Spin, Typography, Input } from "antd";
import { Link } from "react-router-dom";
import './styles.less'
const { Title } = Typography;

interface DataType {
  key: React.Key
  index: number;
  name: string;
}

const GrandMasters: React.FC<DataType> = () => {

  const [players, setPlayers] = useState<DataType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    Players.getPlayers()
      .then((data: PlayersType) => {
        const formattedData = data.players.map(
          (name: string, index: number) => ({
            key: index,
            index: index,
            name: name,
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredPlayers = players?.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "Names",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Link className="playerLinks" to={`player/${text}`}>{text}</Link>,
      sorter: (a: DataType , b: DataType) => a.name.localeCompare(b.name),
    },
  ];

  return (
    <>
      <Title className="grandMaster">Grand Masters</Title>
      <Input.Search
        placeholder="Search for a player"
        value={searchTerm}
        onChange={handleSearch}
        style={{ width: 200, marginBottom: 16, float: 'right'}}
      />
      <Table
        dataSource={filteredPlayers}
        columns={columns}
        loading={{
          spinning: isLoading,
          indicator: <Spin size="large" />,
        }}
        showSorterTooltip={{ target: 'sorter-icon' }}
      />
    </>
  );
};

export default GrandMasters;
