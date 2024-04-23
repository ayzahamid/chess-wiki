import React from "react";
import "./Header.less";
import { Typography } from "antd";
const { Title } = Typography;

const Header: React.FC = () => {

  return (
    <header className="header">
      <a href="/"><img src="logo.png" className="logo"/></a>
      <Title>Chess Wikipedia</Title>
    </header>
  );
};

export default Header;
