import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from './schema.js';
import db from './db.js';


const resolvers = {
    Query: {
        games() {
            return db.games
        },
        game(parent, args) {
            return db.games.find(game => game.id === args.id)
        },
        authors() {
            return db.authors
        },
        author(parent, args) {
            return db.authors.find(author => author.id === args.id);
        },
        reviews() {
            return db.authors
        },
        review(parent, args) {
            return db.reviews.find(review => review.id === args.id);
        },
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter(review => review.game_id === parent.id);
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter(review => review.author_id === parent.id);
        }
    },
    Review: {
        author(parent) {
            return db.authors.find(auther => auther.id === parent.author_id)
        },
        game(parent) {
            return db.games.find(game => this.game.id === parent.game_id);
        }
    },
    Mutation: {
        deleteGame(parent, args) {
            db.games = db.games.filter(game => game.id !== args.id);
            return db.games;
        },
        addGame(parent, args) {
            let game = { ...args.game, id: "44" }
            db.games.push(game)
            return game;
        }
    }

}


const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
});

console.log('Server ready at port', 4000);