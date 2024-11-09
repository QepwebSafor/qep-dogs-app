import { db } from "@/lib/db";
import { loginSchema } from "@/lib/zod";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Google,
    GitHub,
    Credentials({
      authorize: async (credentials) => {
        const { data, success } = loginSchema.safeParse(credentials);

        if (!success) {
          throw new Error("Invalid credentials");
        }

        // verificar si existe el usuario en la base de datos
        const user = await db.user.findUnique({
          where: {
            email: data.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("No user found");
        }

        // verificar si la contraseña es correcta
        const isValid = await bcrypt.compare(data.password, user.hashedPassword);

        if (!isValid) {
          throw new Error("Incorrect password");
        }

      
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
