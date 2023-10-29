import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthActionTypes, AuthContext } from "@state/auth";

export function Login() {
  const { setAuth } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("authToken");
  useEffect(() => {
    setSearchParams();
    if (token) {
      setAuth({ type: AuthActionTypes.UPDATE, jwt: token });
      navigate("/");
    }
  });

  return null;
}
