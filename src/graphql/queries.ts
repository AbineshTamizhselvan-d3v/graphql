import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers($filter: UserFilter) {
    users(filter: $filter) {
      id
      name
      username
      email
      address {
        street
        suite
        city
        zipcode
        geo {
          lat
          lng
        }
      }
      phone
      website
      company {
        name
        catchPhrase
        bs
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts($filter: PostFilter) {
    posts(filter: $filter) {
      id
      userId
      title
      body
      user {
        id
        name
        email
      }
    }
  }
`;

export const GET_COMMENTS = gql`
  query GetComments($filter: CommentFilter) {
    comments(filter: $filter) {
      id
      postId
      name
      email
      body
      post {
        id
        title
      }
    }
  }
`;

export const GET_PHOTOS = gql`
  query GetPhotos($albumId: Int) {
    photos(albumId: $albumId) {
      id
      albumId
      title
      url
      thumbnailUrl
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: Int!) {
    user(id: $id) {
      id
      name
      username
      email
      address {
        street
        suite
        city
        zipcode
        geo {
          lat
          lng
        }
      }
      phone
      website
      company {
        name
        catchPhrase
        bs
      }
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: Int!) {
    post(id: $id) {
      id
      userId
      title
      body
      user {
        id
        name
        email
      }
    }
  }
`;
