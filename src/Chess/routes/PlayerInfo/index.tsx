import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Players } from "../../api/chessApi";
import ProfileType from "../../interfaces/profile";
import CountryType from "../../interfaces/country";
import { Card, Skeleton, Avatar, Typography } from "antd";
import OnlineStatus from "../../components/LastOnline";

const { Title, Text } = Typography;

const PlayerInfo: React.FC = () => {
  const { name } = useParams();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [country, setCountry] = useState<CountryType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playerData = await Players.getSinglePlayerInfo(name);
        setProfile(playerData);

        const url = playerData.country;
        const parts = url.split("/");
        const lastPart = parts[parts.length - 1];
        const countryData = await Players.getCountry(lastPart);
        setCountry(countryData);
      } catch (err) {
        console.log("Error", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [name]);

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <div>
      <OnlineStatus lastOnlineTime={profile?.last_online} />
      <Card
        style={{ width: "auto", margin: "20px auto" }}
        cover={<Avatar size={100} src={profile?.avatar} />}
      >
        <Card.Meta
          title={
            <Title level={5}>
              {profile?.username} ({profile?.name})
            </Title>
          }
          description={
            <div>
              <Text strong>Player ID:</Text> {profile?.player_id}
              <br />
              <Text strong>Followers:</Text> {profile?.followers}
              <br />
              <Text strong>Country:</Text> {country?.name}
              <br />
              <Text strong>Joined:</Text> {profile?.joined}
              <br />
              <Text strong>Status:</Text> {profile?.status}
              <br />
              <Text strong>Streamer:</Text>{" "}
              {profile?.is_streamer ? "Yes" : "No"}
              <br />
              <Text strong>Verified:</Text> {profile?.verified ? "Yes" : "No"}
              <br />
              <Text strong>League:</Text> {profile?.league}
              <br />
              <Text strong>Streaming Platforms:</Text>{" "}
              {profile?.streaming_platforms}
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default PlayerInfo;
