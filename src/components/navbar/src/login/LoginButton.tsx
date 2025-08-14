import { Button } from "@/components/ui/button";

export function LoginButton() {
  return (
    <a href="http://localhost:3000/api/v1/auth/login">
      <Button>Login</Button>
    </a>
  );
}
