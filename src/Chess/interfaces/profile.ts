export default interface ProfileType {
  avatar: string;
  player_id: number;
  url: string;
  name: string;
  username: string;
  followers: number;
  country: string;
  last_online: number;
  joined: number;
  status: string;
  is_streamer: boolean;
  verified: boolean;
  league: string;
  streaming_platforms: string[];
}
