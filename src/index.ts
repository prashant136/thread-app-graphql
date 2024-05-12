import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from "body-parser";


async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 8000
    app.use(bodyParser.json());
    // create graphql server
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
            }
        `,
        resolvers: {
            Query: {
                hello: () => `Hey there, I am graphql server`,
            }
        },
    });

    // start graphql server
    await gqlServer.start();

    app.use('/graphql', expressMiddleware(gqlServer));

    app.listen(PORT, () => console.log(`Server is stated at PORT: ${PORT}`))

}
init();