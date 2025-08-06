import { render, screen } from "@testing-library/react";

import { Login } from "./Login";
import { AuthContext, type AuthState } from "@/state/auth";

function TestLogin({ authState }: { authState: AuthState }) {
  return (
    <AuthContext.Provider value={{ authState, setAuth: (_) => {} }}>
      <Login />
    </AuthContext.Provider>
  );
}

describe("Login Page", () => {
  it("should display login button with undefined token", () => {
    render(<TestLogin authState={undefined} />);

    expect(screen.getByText("Login")).toBeDefined();
  });

  it("should display signed in with valid token", () => {
    render(
      <TestLogin
        authState={{ isExpired: false, userInfo: { isAdmin: false } } as never}
      />,
    );

    expect(screen.getByAltText("User settings")).toBeDefined();
  });

  it("should display login button with expired token", () => {
    render(<TestLogin authState={{ isExpired: true } as never} />);

    expect(screen.getByText("Login")).toBeDefined();
  });
});
