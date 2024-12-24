import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            id: "google",
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        // Custom Backend Authentication
        CredentialsProvider({
            id: "credentials",
            name: "Custom Backend",
            credentials: {
              email: { label: "Email", type: "email" },
              password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
              try {
                const response = await axios.post(
                  `${process.env.BACKEND_URL}/login`,
                  {
                    email: credentials?.email,
                    password: credentials?.password,
                  }
                );
                if (response.data?.user) {
                  return response.data.user; // Return user object
                }
                return null;
              } catch (error) {
                throw new Error("Invalid email or password");
              }
            },
          }),
        ],
        session: {
          strategy: "jwt",
        },
        callbacks: {
          async jwt({ token, user }) {
            if (user) {
              token.id = user.id;
              token.email = user.email;
            }
            return token;
          },
          async session({ session, token }) {
            if (token) {
              session.user.id = token.id;
              session.user.email = token.email;
            }
            return session;
          },
        },
})

export {handler as GET, handler as POST}