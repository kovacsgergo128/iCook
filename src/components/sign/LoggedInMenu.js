import React, { useContext } from "react";
import { Menu, Dropdown, Button } from "antd";
import styled from "styled-components";
import { LogoutContext } from "../../context/LogoutContext";
import { UserContext } from "../../context/UserContext";

const StyledImage = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const StyledMenu = styled(Menu)`
  position: fixed;
`;

const LoggedInMenu = () => {
  const { logout } = useContext(LogoutContext);
  const { username } = useContext(UserContext);

  const menu = (
    <StyledMenu>
      {/* <Menu.Item key="0">
        <Button>Profile</Button>
      </Menu.Item>
      <Menu.Divider /> */}
      <Menu.Item key="1">
        <p>{username}</p>
      </Menu.Item>
      <Menu.Item key="2">
        <Button onClick={logout}>Logout</Button>
      </Menu.Item>
    </StyledMenu>
  );
  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <StyledImage
        className="profile-menu"
        alt="Profile Menu"
        src="/profile-picture-default.png"
      />
    </Dropdown>
  );
};

export default LoggedInMenu;
