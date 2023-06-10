import "$std/dotenv/load.ts";
import { createClient } from "kv_oauth";

export interface State {
  session: string | undefined;
}

export const client = createClient("github");
