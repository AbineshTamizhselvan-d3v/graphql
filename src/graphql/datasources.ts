import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface DataSourceContext {
  dataSources: any;
}

export class JSONPlaceholderAPI {
  async getUsers(): Promise<User[]> {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  }

  async getUser(id: number): Promise<User | null> {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async getPosts(): Promise<Post[]> {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    return response.data;
  }

  async getPost(id: number): Promise<Post | null> {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async getPostsByUserId(userId: number): Promise<Post[]> {
    const response = await axios.get(`${API_BASE_URL}/posts?userId=${userId}`);
    return response.data;
  }

  async getComments(): Promise<Comment[]> {
    const response = await axios.get(`${API_BASE_URL}/comments`);
    return response.data;
  }

  async getComment(id: number): Promise<Comment | null> {
    try {
      const response = await axios.get(`${API_BASE_URL}/comments/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    const response = await axios.get(`${API_BASE_URL}/comments?postId=${postId}`);
    return response.data;
  }

  async getPhotos(): Promise<Photo[]> {
    const response = await axios.get(`${API_BASE_URL}/photos`);
    return response.data;
  }

  async getPhoto(id: number): Promise<Photo | null> {
    try {
      const response = await axios.get(`${API_BASE_URL}/photos/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async getPhotosByAlbumId(albumId: number): Promise<Photo[]> {
    const response = await axios.get(`${API_BASE_URL}/photos?albumId=${albumId}`);
    return response.data;
  }
}
