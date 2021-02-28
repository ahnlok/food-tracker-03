const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config.js");
const pubsub = new PubSub();

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Able access the request body in context
  context: ({ req }) => ({ req, pubsub }),
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log("MongoDB Connected Successfully");
  return server.listen({ port: PORT });
})
.then((res) => {
  console.log(`Server running at ${res.url}`);
})
.catch(err => {
  console.error(err)
})
// app.get("*", (req, res) => {
  
//   res.sendFile(path.join(__dirname, "client/build/index.html"));
// });

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${res.url}`);
//   });