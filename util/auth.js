import config from "../config";
import credentials from "../credentials";
import axios from "axios";

export default async token => {
  try {
    if (typeof token !== "string") throw "No Auth Header";

    //Get Session
    const session = (
      await axios.get(
        `${config.fpApiUrl}/session?token=${encodeURIComponent(token)}`,
        {
          auth: {
            username: credentials.allesOAuth.id,
            password: credentials.allesOAuth.secret
          }
        }
      )
    ).data;

    //Get User
    const user = (
      await axios.get(
        `${config.fpApiUrl}/user?id=${encodeURIComponent(session.user)}`,
        {
          auth: {
            username: credentials.allesOAuth.id,
            password: credentials.allesOAuth.secret
          }
        }
      )
    ).data;

    return user;
  } catch (e) {
    return;
  }
};
