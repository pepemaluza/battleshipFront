import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import GoogleLogin from "react-google-login";

interface AuthResponse {
  token: string;
  user: User;
}

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

const GoogleAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const onSuccess = async (res: any) => {
    console.log("res: ", res)
    try {
      const result: AxiosResponse<AuthResponse> = await axios.post("/auth/", {
        token: res?.tokenId,
      });

      setUser(result.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={'login-container-div'}>
      {!user && (
        <GoogleLogin
          clientId={"985762524543-cighrje1bfoql8mfn96r4uvulsgqutck.apps.googleusercontent.com"}
          onSuccess={onSuccess}
          onFailure={(e) => console.log(e)}
          render={renderProps => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
          )}
          buttonText="Login"
        />
      )}

      {user && (
        <>
          <img src={user.avatar} alt={"alt"}/>
          <h1>
            {user.name}
          </h1>
        </>
      )}
    </div>
  );
};

export default GoogleAuth;
