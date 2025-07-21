import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '@/graphql/schema';
import { resolvers } from '@/graphql/resolvers';
import { DataSourceContext } from '@/graphql/datasources';

const server = new ApolloServer<DataSourceContext>({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async () => ({
    dataSources: {
      // We'll initialize our data sources here
    },
  }),
});

export { handler as GET, handler as POST };
