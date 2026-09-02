import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "royalstours.amd@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter email and password.");
        }

        const envEmail = process.env.ADMIN_EMAIL || "royalstours.amd@gmail.com";
        const envPassword = process.env.ADMIN_PASSWORD || "admin123";

        // Check environment variable admin fallback first for easy zero-friction setup
        if (
          credentials.email.toLowerCase() === envEmail.toLowerCase() &&
          credentials.password === envPassword
        ) {
          return {
            id: "admin-env",
            name: "Royals Tours Admin",
            email: envEmail,
            role: "admin",
          };
        }

        // Otherwise check MongoDB User database if MONGODB_URI is provided
        try {
          await connectDB();
          const user = await User.findOne({ email: credentials.email.toLowerCase() });

          if (user && user.password) {
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (isValid) {
              return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role || "admin",
              };
            }
          }
        } catch (error) {
          console.error("Auth DB check error:", error);
        }

        throw new Error("Invalid admin email or password.");
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role || "admin";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = (token.role as string) || "admin";
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "royal-tours-super-secret-key-2026",
};
