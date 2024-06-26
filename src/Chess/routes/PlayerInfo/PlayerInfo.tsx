import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Players } from "../../api/chessApi";
import ProfileType from "../../interfaces/profile";
import CountryType from "../../interfaces/country";
import { Card, Avatar, Typography, Row, Col } from "antd";
import OnlineStatus from "../../components/LastOnline";
import './styles.less';

const { Title, Text } = Typography;

const PlayerInfo: React.FC = () => {
  const { name } = useParams();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [country, setCountry] = useState<CountryType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const joinedDate = profile?.joined ? new Date(profile.joined * 1000).toDateString() : null;

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
      <Row justify="center" align="middle" style={{ marginTop: 50 }}>
        <Col xs={22} sm={20} md={16} lg={14} xl={12} xxl={10}>
          <Card
            style={{ position: "relative" }}
            cover={<Avatar className="card-avatar" size={100} src={profile?.avatar} />}
            loading={isLoading}
          >
            <div className="lastOnline">
              <OnlineStatus lastOnlineTime={profile?.last_online} />
            </div>
            <Card.Meta
              title={
                <>
                  <Title level={5}>{profile?.username}</Title>
                  {profile?.name && <Text>({profile.name})</Text>}
                </>
              }
              description={
                <div>
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
                    <Text strong>Joined:</Text> {joinedDate}
                  </div>
                  <div>
                    <Text strong>Status:</Text> {profile?.status}
                  </div>
                  <div>
                    <Text strong>Streamer:</Text> {profile?.is_streamer ? "Yes" : "No"}
                  </div>
                  <div>
                    <Text strong>Verified:</Text> {profile?.verified ? "Yes" : "No"}
                  </div>
                  <div>
                    <Text strong>League:</Text> {profile?.league ? profile.league : 'Not Available'}
                  </div>
                  <div>
                    <Text strong>Streaming Platforms:</Text>{" "}
                    {profile?.streaming_platforms}
                  </div>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlayerInfo;
