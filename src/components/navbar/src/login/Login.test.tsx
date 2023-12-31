import renderer from "react-test-renderer";

import { AuthContext, AuthState } from "@state/auth";

import { Login } from "./Login";
import { LoginButton } from "./LoginButton";
import { SignedIn } from "./SignedIn";

function TestLogin({ authState }: { authState: AuthState }) {
  return (
    <AuthContext.Provider value={{ authState, setAuth: (_) => {} }}>
      <Login />
    </AuthContext.Provider>
  );
}

describe("Login Page", () => {
  it("should display login button with undefined token", () => {
    const component = renderer.create(<TestLogin authState={undefined} />);
    const testInstance = component.root;

    expect(testInstance.findByType(LoginButton)).toBeDefined();
  });

  it("should display signed in with valid token", () => {
    const component = renderer.create(
      <TestLogin
        authState={{ isExpired: false, userInfo: { isAdmin: false } } as never}
      />,
    );
    const testInstance = component.root;

    expect(testInstance.findByType(SignedIn)).toBeDefined();
  });

  it("should display login button with expired token", () => {
    const component = renderer.create(
      <TestLogin authState={{ isExpired: true } as never} />,
    );
    const testInstance = component.root;

    expect(testInstance.findByType(LoginButton)).toBeDefined();
  });
});
