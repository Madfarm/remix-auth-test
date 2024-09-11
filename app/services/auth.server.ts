import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from 'remix-auth-form';
import { sessionStorage, AuthUser } from "~/services/session.server";
import { findOrCreateUser } from "./db.service";




const authenticator = new Authenticator<AuthUser | Error | null>(sessionStorage, {
    sessionKey: "sessionKey", // keep in sync
    sessionErrorKey: "sessionErrorKey", // keep in sync
  });


  // Tell the Authenticator to use the form strategy
authenticator.use(
    new FormStrategy(async ({ form }) => {
  
      // get the data from the form...
      let userName = form.get('userName') as string;
      let password = form.get('password') as string;
  
      // initialize the user here
      let user = null;
  
      // do some validation, errors are in the sessionErrorKey
      if (!userName || userName?.length === 0) throw new AuthorizationError('Bad Credentials: Username is required')
      if (typeof userName !== 'string')
        throw new AuthorizationError('Bad Credentials: Username must be a string')
  
      if (!password || password?.length === 0) throw new AuthorizationError('Bad Credentials: Password is required')
      if (typeof password !== 'string')
        throw new AuthorizationError('Bad Credentials: Password must be a string')
  
      
      user = findOrCreateUser({
        userName: userName, password: password
      })

      // login the user, this could be whatever process you want
      if (user) {
        user = {
          name: userName,
          token: `${password}-${new Date().getTime()}`,
        };
  
        // the type of this user must match the type you pass to the Authenticator
        // the strategy will automatically inherit the type if you instantiate
        // directly inside the `use` method
        return await Promise.resolve({ ...user });
  
      } else {
        // if problem with user throw error AuthorizationError
        throw new AuthorizationError("Bad Credentials")
      }
  
    }),
  );
  
  export default authenticator
