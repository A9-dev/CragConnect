import { Button } from "@chakra-ui/react";

const SignoutButton = ({ setLoggedIn, setUsername }) => {
  const handleSignout = () => {
    setLoggedIn(false);
    setUsername("");
  };

  return <Button onClick={handleSignout}>Sign Out</Button>;
};

export default SignoutButton;
