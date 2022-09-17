import React from "react";
import { Navbar, Avatar, Text, Button, useTheme } from "@nextui-org/react";
import useDarkMode from "use-dark-mode";
import { AcmeLogo } from "../components/icons/logo";
import { MoonIcon } from "../components/icons/moon";
import { SunIcon } from "../components/icons/sun";

 const NavbarComponent = () => {
  const darkMode = useDarkMode(false);
  const { theme } = useTheme();

  const variant = "floating";
  return (
    <Navbar isBordered variant={variant}>
      <Navbar.Brand>
        <AcmeLogo />
        <Text b color="inherit" hideIn="xs">
          HE
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
            <Avatar text="H" size="md" color="gradient" textColor="white" />
            <Text
              css={{
                margin: "$5",
                fontWeight: "$bold",
              }}
            >
              Hande Özcan
            </Text>
          </div>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}

export default NavbarComponent
