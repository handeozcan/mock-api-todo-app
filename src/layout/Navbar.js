import React from "react";
import {
  Navbar,
  Avatar,
  Text,
  Button,
  useTheme,
  Tooltip,
} from "@nextui-org/react";
import useDarkMode from "use-dark-mode";
import useLocalStorage from "../hooks/useLocalStorage";
import { MoonIcon } from "../components/icons/moon";
import { SunIcon } from "../components/icons/sun";
import { LogoutIcon } from "../components/icons/logoutIcon";

const NavbarComponent = () => {
  const token = useLocalStorage("token");
  const darkMode = useDarkMode(false);
  const { theme } = useTheme();

  const variant = "floating";
  return (
    <Navbar isBordered variant={variant}>
      <Navbar.Brand>
        <img width={36} height={36} src="./task.png" alt="Logo"/>
        <Text css={{ml:"$4"}} b color="inherit" hideIn="xs">
         TODO APP
        </Text>
      </Navbar.Brand>

      <Navbar.Content>
        <Navbar.Item>
          <Button
            onClick={() => darkMode.toggle()}
            auto
            color="#5C0523"
            icon={
              darkMode.value ? (
                <SunIcon fill={theme.colors.blue50.value} filled />
              ) : (
                <MoonIcon fill={theme.colors.blue900.value} filled />
              )
            }
          />
        </Navbar.Item>
        <Navbar.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              text={token[0].userName.length > 0 ? token[0].userName.split("")[0] : "?"}
              size="md"
              color="gradient"
              textColor="white"
            />
            <Text
              css={{
                margin: "$5",
                fontWeight: "$bold",
              }}
            >
              {token[0].userName}
            </Text>
            <Tooltip content="Logout" color="primary">
              <Button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload()
                }}
                css={{background:"transparent"}}
                auto
                icon={<LogoutIcon fill={theme.colors.gray800.value} filled />}
              />
            </Tooltip>
          </div>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
};

export default NavbarComponent;
