import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Players } from "../../api/api";
import ProfileType from "../../interfaces/profile";
import { Card, Skeleton, Avatar, Typography } from "antd";
import OnlineStatus from "../../components/LastOnline";
import CountryType from "../../interfaces/country";

const { Title, Text } = Typography;

const PlayerInfo: React.FC = () => {
  const { name } = useParams();
  const [profile, setProfile] = useState<ProfileType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [country, setCountry] = useState<CountryType>();

  useEffect(() => {
    Players.getSinglePlayerInfo(name)
      .then((data: ProfileType) => {
        setProfile(data);
        const url = data.country;
        const parts = url.split("/");
        const lastPart = parts[parts.length - 1];
        Players.getCountry(lastPart).then((data: CountryType) => {
          setCountry(data);
        });
      })
      .catch((err: Error) => {
        console.log("Error", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  return isLoading ? (
    <Skeleton active />
  ) : (
    <div>
      <Link to={"/"}>Home</Link>
      <OnlineStatus lastOnlineTime={profile?.last_online} />
      <Card
        style={{ width: "auto", margin: "20px auto" }}
        cover={<Avatar size={100} src={profile?.avatar} />}
      >
        <Card.Meta
          title={
            <Title level={4}>
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
