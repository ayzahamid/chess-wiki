import React, { useState, useEffect } from "react";

const OnlineStatus: React.FC<{ lastOnlineTime: number | undefined }> = ({
  lastOnlineTime,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const formatTimeDifference = (timestamp: number | undefined): string => {
    if (timestamp === undefined) {
      return "Never";
    }

    const secondsAgo = Math.floor(
      (currentTime.getTime() - timestamp * 1000) / 1000,
    );

    const hours = Math.floor(secondsAgo / 3600);
    const minutes = Math.floor((secondsAgo % 3600) / 60);
    const seconds = secondsAgo % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return <div>Last online: {formatTimeDifference(lastOnlineTime)}</div>;
};

export default OnlineStatus;
