import { Button } from "flowbite-react";

export function LoginButton() {
  return (
    <Button href="http://localhost:3000/api/v1/auth/login" color="yellow">
      Login
    </Button>
  );
}
