const graphql = require("graphql");
var _ = require("lodash");

const userData = [
  {
    id: "1",
    name: "John Doe",
    age: 30,
  },
  {
    id: "2",
    name: "Jane Doe",
    age: 25,
  },
  {
    id: "3",
    name: "Jack Doe",
    age: 20,
  },
  {
    id: "4",
    name: "Jill Doe",
    age: 35,
  },
];
const hobbyData = [
  {
    id: "1",
    title: "Hobby 1",
    description: "This is a hobby 1",
    userId: "2",
  },
  {
    id: "2",
    title: "Hobby 2",
    description: "This is a hobby 2",
    userId: "1",
  },
  {
    id: "3",
    title: "Hobby 3",
    description: "This is a hobby 3",
    userId: "1",
  },
  {
    id: "4",
    title: "Hobby 4",
    description: "This is a hobby 4",
    userId: "2",
  },
  {
    id: "5",
    title: "Hobby 5",
    description: "This is a hobby 5",
    userId: "4",
  },
];

const postData = [
  {
    id: "1",
    comment: "Post 1",
    userId: "1",
  },
  {
    id: "2",
    comment: "Post 2",
    userId: "1",
  },
  {
    id: "3",
    comment: "Post 3",
    userId: "2",
  },
];

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

// types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentationf for User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Documentationf for Hobby",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(userData, { id: parent.userId });
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Documentationf for Post",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(userData, { id: parent.userId });
      },
    },
  }),
});

// rootquery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description for RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(userData, { id: args.id });
      },
    },
    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(hobbyData, { id: args.id });
      },
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(postData, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
