import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import Event from "@models/event";

import { connectToDB } from "@utils/database";
import Organizer from "@models/organizer";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })/*,
    CredentialsProvider({
      credentials: {
        email: {  },
        password: { },
      },
      async authorize(credentials, req) {
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    })*/,
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      let isOrganizer = await Organizer.findOne({
        user_id: sessionUser._id
      });
      console.log(isOrganizer)
      if (isOrganizer != undefined) {
        isOrganizer = true;
      }else{
        isOrganizer = false;
      }
      const events = await Event.find({users_signed: sessionUser._id});
      session.user._id = sessionUser._id.toString();
      session.user.image = sessionUser.image.toString();
      session.user.username = sessionUser.username;
      session.user.isOrganizer = isOrganizer;
      session.user.events = events;
      console.log(session.user);
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        const userExists = await User.findOne({
          email: profile.email,
        });
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            name:profile.name,
            image: profile.picture,
          });
        }
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
