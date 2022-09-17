import React, { useState } from "react";
import { Grid, Card, Text, useTheme, Input, Button } from "@nextui-org/react";

const Login = () => {
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const handleLogin = () => {
    const user = {
        email,
        password,
      };
    localStorage.setItem("token",JSON.stringify(user))
    window.location.reload()
  };

  return (
    <Grid.Container
      css={{
        height: "100vh",
      }}
      gap={2}
      justify="center"
      alignItems="center"
    >
      <Grid xs={10} sm={6} md={3} lg={3}>
        <Card css={{ h: "400px" }}>
          <Card.Body>
            <Text h1 size={15} css={{ mt: 0, textAlign: "center" }}>
              LOGIN
            </Text>
            <Input
              css={{
                mt: "$15",
                mr: "$10",
                ml: "$10",
              }}
              clearable
              bordered
              shadow={true}
              type="email"
              label="Email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input.Password
              css={{
                mt: "$12",
                mr: "$10",
                ml: "$10",
              }}
              clearable
              bordered
              type="password"
              label="Password"
              placeholder="Enter your password with eye"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Card.Body>
          <Card.Footer
            isBlurred
            css={{
              display: "flex",
              bgBlur: "#9BA1A6",
              borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
              bottom: 0,
              zIndex: 1,
              justifyContent: "center",
            }}
          >
            <Button flat auto rounded color="neutral" onClick={handleLogin}>
              <Text
                color={theme.colors.accents5.value}
                weight="bold"
                transform="uppercase"
              >
                Login
              </Text>
            </Button>
          </Card.Footer>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export default Login;
