import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  database: { type: 'postgres', url: process.env.DATABASE_URL },
});
