import { prisma } from "@/lib";
import { SigninFormData } from "@/validation";
import CredentialsProvider from "next-auth/providers/credentials";
import { verify } from "argon2";
import { Password } from "@mui/icons-material";
import NextAuth from "next-auth/next";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      //@ts-ignore
      async authorize(payload: SigninFormData) {
        const { email, password } = payload;

        const user = await prisma.users.findUnique({
          where: {
            email: email,
          },
        });

        if (!user) {
          throw new Error("User Doesn't Exist");
        }

        const isPasswordValid = await verify(user.password, password);

        if (!isPasswordValid) {
          throw new Error("Wrong Password");
        }

        return user;
      },
    }),
  ],
  secret: "hkdhfaklfdk33i4u31idnf23@#@#23kI",
  callbacks: {
    async session({ session, user }: any) {
      const check = await prisma.users.findUnique({
        // @ts-ignore
        where: { email: session.user.email },
      });
      session.user = {
        email: check?.email,
        id: check?.id,
      };
      return session;
    },
  },
};

export default NextAuth(authOptions);
