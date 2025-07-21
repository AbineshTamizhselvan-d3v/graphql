import { JSONPlaceholderAPI, User, Post, Comment, Photo } from './datasources';

const api = new JSONPlaceholderAPI();

interface PostFilter {
  userId?: number;
  title?: string;
}

interface UserFilter {
  name?: string;
  email?: string;
  city?: string;
}

interface CommentFilter {
  postId?: number;
  email?: string;
}

export const resolvers = {
  Query: {
    users: async (_: any, { filter }: { filter?: UserFilter }) => {
      let users = await api.getUsers();
      
      if (filter) {
        users = users.filter(user => {
          if (filter.name && !user.name.toLowerCase().includes(filter.name.toLowerCase())) {
            return false;
          }
          if (filter.email && !user.email.toLowerCase().includes(filter.email.toLowerCase())) {
            return false;
          }
          if (filter.city && !user.address.city.toLowerCase().includes(filter.city.toLowerCase())) {
            return false;
          }
          return true;
        });
      }
      
      return users;
    },
    
    user: async (_: any, { id }: { id: number }) => {
      return await api.getUser(id);
    },
    
    posts: async (_: any, { filter }: { filter?: PostFilter }) => {
      let posts = await api.getPosts();
      
      if (filter) {
        posts = posts.filter(post => {
          if (filter.userId && post.userId !== filter.userId) {
            return false;
          }
          if (filter.title && !post.title.toLowerCase().includes(filter.title.toLowerCase())) {
            return false;
          }
          return true;
        });
      }
      
      return posts;
    },
    
    post: async (_: any, { id }: { id: number }) => {
      return await api.getPost(id);
    },
    
    comments: async (_: any, { filter }: { filter?: CommentFilter }) => {
      let comments = await api.getComments();
      
      if (filter) {
        comments = comments.filter(comment => {
          if (filter.postId && comment.postId !== filter.postId) {
            return false;
          }
          if (filter.email && !comment.email.toLowerCase().includes(filter.email.toLowerCase())) {
            return false;
          }
          return true;
        });
      }
      
      return comments;
    },
    
    comment: async (_: any, { id }: { id: number }) => {
      return await api.getComment(id);
    },
    
    photos: async (_: any, { albumId }: { albumId?: number }) => {
      if (albumId) {
        return await api.getPhotosByAlbumId(albumId);
      }
      return await api.getPhotos();
    },
    
    photo: async (_: any, { id }: { id: number }) => {
      return await api.getPhoto(id);
    },
  },
  
  Post: {
    user: async (parent: Post) => {
      return await api.getUser(parent.userId);
    },
  },
  
  Comment: {
    post: async (parent: Comment) => {
      return await api.getPost(parent.postId);
    },
  },
};
