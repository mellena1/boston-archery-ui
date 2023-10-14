import renderer from 'react-test-renderer';
import { AuthContext, AuthState } from '../../../state';
import { Login } from '.';
import { LoginButton } from './loginbutton';
import { SignedIn } from './signedin';

function TestLogin({ authState }: { authState: AuthState }) {
    return (
        <AuthContext.Provider value={ { authState, setAuth: (_) => {} } }>
            <Login />
        </AuthContext.Provider>
    );
}

describe("Login Page", () => {
    it("should display login button with undefined token", () => {
        const component = renderer.create(<TestLogin authState={ undefined } />);
        const testInstance = component.root;

        expect(testInstance.findByType(LoginButton)).toBeDefined();
    });

    it("should display signed in with valid token", () => {
        const component = renderer.create(<TestLogin authState={ { isExpired: false } } />);
        const testInstance = component.root;

        expect(testInstance.findByType(SignedIn)).toBeDefined();
    });

    it("should display login button with expired token", () => {
        const component = renderer.create(<TestLogin authState={ { isExpired: true } } />);
        const testInstance = component.root;

        expect(testInstance.findByType(LoginButton)).toBeDefined();
    });
});
