import React from "react";
import "./Header.less";
import { Typography } from "antd";
const { Title } = Typography;

interface HeaderProps {
  image: string
}

const Header: React.FC<HeaderProps>= ({image}) => {

  return (
    <header className="header">
      <a href="/"><img src={image} className="logo"/></a>
      <Title>Chess Wikipedia</Title>
    </header>
  );
};

export default Header;
