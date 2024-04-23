import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Players } from "../../api/chessApi";
import ProfileType from "../../interfaces/profile";
import CountryType from "../../interfaces/country";
import { Card, Avatar, Typography } from "antd";
import OnlineStatus from "../../components/LastOnline";
import './styles.less'

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

  return (
    <>
    <div className="lastOnline">
        <OnlineStatus lastOnlineTime={profile?.last_online} />
    </div>
    <Card
        style={{ width: "auto", margin: "20px auto" }}
        cover={<Avatar className="card-avatar" size={100} src={profile?.avatar? profile.avatar : 'public/avatar.png'} />}

        loading={isLoading}
      >
        <Card.Meta
          title={
            <Title level={5}>
              {profile?.username} ({profile?.name})
            </Title>
          }
          description={
            <div className="card-meta-description">
              <div>
                <Text strong>Player ID:</Text> {profile?.player_id}
              </div>
              <div>
                <Text strong>Followers:</Text> {profile?.followers}
              </div>
              <div>
                <Text strong>Country:</Text> {country?.name}
              </div>
              <div>
                <Text strong>Joined:</Text> {profile?.joined}
              </div>
              <div>
                <Text strong>Status:</Text> {profile?.status}
              </div>
              <div>
                <Text strong>Streamer:</Text>{" "}
              {profile?.is_streamer ? "Yes" : "No"}
              </div>
              <div>
                <Text strong>Verified:</Text> {profile?.verified ? "Yes" : "No"}
              </div>
              <div>
                <Text strong>League:</Text> {profile?.league? profile.league : 'Not Available'}
              </div>
              <div>
                <Text strong>Streaming Platforms:</Text>{" "}
                {profile?.streaming_platforms}
              </div>
            </div>
          }
        />
      </Card>
    </>
  );
};

export default PlayerInfo;
