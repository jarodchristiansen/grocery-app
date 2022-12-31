import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  // site: process.env.NEXTAUTH_URL,
  database: process.env.MONGODB_URI,
  session: {
    jwt: true,
  },
  callbacks: {
    async session(session, token) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
    async jwt(token, user) {
      if (user) {
        token.accessToken = user._id;
        token.user = user;
      }
      return token;
    },
    async signIn(user, account, metadata, profile) {
      let emails;
      let primaryEmail;
    },
  },
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  // ******** !!!! ADD BELOW LINE !!!! **********
  // Prevents localhost issue on vercel auth deployment
  secret: "PLACE-HERE-ANY-STRING",
  // database: process.env.MONGODB_URI,
  pages: {
    signIn: "/auth",
  },
};

export default async (req, res) => NextAuth(req, res, options);
