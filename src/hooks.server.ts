import { SvelteKitAuth } from "@auth/sveltekit";
import CredentialsProvider from "@auth/core/providers/credentials";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// Secure database connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const handle = SvelteKitAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const [rows]: [any[], any] = await db.query(
          "SELECT id, name, email, password, role FROM users WHERE email = ?",
          [credentials.email]
        );

        if (rows.length === 0) {
          throw new Error("User not found");
        }

        const user = rows[0];

        const validPassword = await bcrypt.compare(
          credentials.password as string,
          String(user.password)
        );

        if (!validPassword) {
          throw new Error("Invalid password");
        }

        return { id: user.id, name: user.name, email: user.email, role: user.role };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role as string | undefined;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user?.role as string) || undefined;
      }
      return token;
    },
  },
}).handle;
