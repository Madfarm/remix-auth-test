import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from 'remix-auth-form';
import { sessionStorage, AuthUser } from "~/services/session.server";
import { Login } from "./db.server";




const authenticator = new Authenticator<AuthUser | Error | null>(sessionStorage, {
    sessionKey: "sessionKey", 
    sessionErrorKey: "sessionErrorKey", 
  });


  
authenticator.use(
    new FormStrategy(async ({ form }) => {
      let userName = form.get('userName') as string;
      let password = form.get('password') as string;
  
      let user = null;
  
      // Errors are in the sessionErrorKey
      if (!userName || userName?.length === 0) throw new AuthorizationError('Bad Credentials: Username is required')
      if (typeof userName !== 'string')
        throw new AuthorizationError('Bad Credentials: Username must be a string')
  
      if (!password || password?.length === 0) throw new AuthorizationError('Bad Credentials: Password is required')
      if (typeof password !== 'string')
        throw new AuthorizationError('Bad Credentials: Password must be a string')
  
      
      user = await Login({
        userName: userName, password: password
      })

      
      if (user != null) {
        user = {
          name: userName,
          token: `${password}-${new Date().getTime()}`,
        };
  
        return await Promise.resolve({ ...user });
  
      } else {
        throw new AuthorizationError("Bad Credentials")
      }
  
    }),
  );
  
  export default authenticator
