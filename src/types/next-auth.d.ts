import { ExtraRole } from "@/models/User";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      roles: ExtraRole[];
    } & DefaultSession["user"];
  }
  interface User {
    roles: ExtraRole[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    roles: ExtraRole[];
  }
}