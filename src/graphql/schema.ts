export const typeDefs = `#graphql
  type User {
    id: Int!
    name: String!
    username: String!
    email: String!
    address: Address!
    phone: String!
    website: String!
    company: Company!
  }

  type Address {
    street: String!
    suite: String!
    city: String!
    zipcode: String!
    geo: Geo!
  }

  type Geo {
    lat: String!
    lng: String!
  }

  type Company {
    name: String!
    catchPhrase: String!
    bs: String!
  }

  type Post {
    id: Int!
    userId: Int!
    title: String!
    body: String!
    user: User
  }

  type Comment {
    id: Int!
    postId: Int!
    name: String!
    email: String!
    body: String!
    post: Post
  }

  type Photo {
    id: Int!
    albumId: Int!
    title: String!
    url: String!
    thumbnailUrl: String!
  }

  input PostFilter {
    userId: Int
    title: String
  }

  input UserFilter {
    name: String
    email: String
    city: String
  }

  input CommentFilter {
    postId: Int
    email: String
  }

  type Query {
    users(filter: UserFilter): [User!]!
    user(id: Int!): User
    posts(filter: PostFilter): [Post!]!
    post(id: Int!): Post
    comments(filter: CommentFilter): [Comment!]!
    comment(id: Int!): Comment
    photos(albumId: Int): [Photo!]!
    photo(id: Int!): Photo
  }
`;
