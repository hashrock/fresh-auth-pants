import { Handlers } from "$fresh/server.ts";
import { setUserWithSession, User } from "@/utils/users.ts";
import { getAuthenticatedUser } from "@/utils/github.ts";
import { handleCallback } from "kv_oauth";
import { client } from "@/utils/kv_oauth.ts";

export const handler: Handlers = {
  async GET(req) {
    const { response, accessToken, sessionId } = await handleCallback(
      req,
      client,
    );
    const ghUser = await getAuthenticatedUser(accessToken);

    const user: User = {
      id: String(ghUser.id),
      login: ghUser.login,
      name: ghUser.name,
      avatarUrl: ghUser.avatar_url,
    };
    await setUserWithSession(user, sessionId);

    return response;
  },
};
