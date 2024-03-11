import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const prisma = new PrismaClient();

const authOptions = {
  secret: process.env.SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    //Add another provider
  ],
  events: {
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2022-11-15",
      });
      //Let's create a stripe customer

      const costumer = await stripe.customers.create({
        email: user.email || undefined,
        name: user.name || undefined,
      });
      //Also update our prisma user with the stripecustomerid

      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: costumer.id },
      });
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
