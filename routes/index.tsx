import { Head } from "$fresh/runtime.ts";
import { Page } from "@/components/Page.tsx";
import { HandlerContext, PageProps } from "$fresh/server.ts";

import { State } from "@/utils/kv_oauth.ts";
import { getUserBySession, User } from "@/utils/users.ts";

interface Data {
  user?: User;
}

export async function handler(req: Request, ctx: HandlerContext<Data, State>) {
  if (!ctx.state.session) return ctx.render({});

  const user = await getUserBySession(ctx.state.session);

  if (!user) return ctx.render({});

  return ctx.render({ user });
}

export default function Home(props: PageProps<Data>) {
  return (
    <>
      <Page user={props.data?.user}>
        <Head>
          <title>Fresh App</title>
        </Head>
        <div class="p-4 mx-auto max-w-screen-md">
          <p class="my-6">
            Welcome to `fresh`. Try updating this message in the
            ./routes/index.tsx file, and refresh.
          </p>
        </div>
      </Page>
    </>
  );
}
