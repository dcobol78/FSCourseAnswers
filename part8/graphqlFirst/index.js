const { ApolloServer, UserInputError, gql } = require('Apollo-server');
const uuid = require('uuid/v1');
const Author = require('./models/Author');
const Book = require('./models/Book');
const User = require('./models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
mongoose.set('useFindAndModify', false);
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = 'HEHEoehEOyehsas';
mongoose.set('useCreateIndex', true);
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to mongo.');
  })
  .catch((error) => {
    console.log('error connection to MONGODB', error);
  });

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    login(username: String!, password: String!): Token
    createUser(username: String!, favoriteGenre: String!): User
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filteredBooks = await Book.find({}).populate('author');
      if (args.author) {
        filteredBooks = filteredBooks.filter(
          (b) => b.author.name === args.author
        );
      }
      if (args.genre) {
        filteredBooks = filteredBooks.filter((b) =>
          b.genres.includes(args.genre)
        );
      }

      return filteredBooks;
    },
    allAuthors: async () => {
      const books = await Book.find({});
      const authors = await Author.find({});
      const q = authors.map((a) => {
        a.bookCount = 0;
        books.forEach((b) => {
          if (b.author === a.name) {
            a.bookCount++;
          }
        });
        return a;
      });
      return q;
    },
    me: (root, args, { currentUser }) => currentUser,
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      const authors = await Author.find({});
      if (!authors.find((a) => a.name === args.author)) {
        const author = new Author({
          name: args.author,
          born: null,
        });
        try {
          await author.save();
        } catch (e) {
          throw new UserInputError(e.message, {
            invalidArgs: args,
          });
        }
      }
      const Rauthor = await Author.findOne({ name: args.author });
      const book = new Book({ ...args, author: Rauthor });
      try {
        await book.save();
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }
      return book;
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (e) {
        throw new UserInputError(e, message, {
          invalidArgs: args,
        });
      }
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });
      try {
        await user.save();
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user) {
        throw new UserInputError('wrong credentials');
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
