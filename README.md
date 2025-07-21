# Next.js GraphQL UI Application

A modern Next.js application demonstrating GraphQL integration with filtering capabilities, built using the JSONPlaceholder API.

## 🚀 Features

- **GraphQL Server**: Custom GraphQL server with Apollo Server
- **Apollo Client**: Client-side GraphQL management
- **TypeScript**: Fully typed application
- **TailwindCSS**: Modern styling
- **Filtering**: Advanced filtering capabilities for all data types
- **Responsive Design**: Mobile-first responsive UI

## 📋 What We Used in GraphQL

### 1. **GraphQL Schema Definition**
We defined a comprehensive GraphQL schema with the following types:
- `User` - User information with nested address and company
- `Post` - Blog posts with user relationships
- `Comment` - Comments with post relationships  
- `Photo` - Photos organized by albums

### 2. **GraphQL Queries**
Implemented queries for fetching data:
```graphql
query GetUsers($filter: UserFilter) {
  users(filter: $filter) {
    id
    name
    email
    # ... other fields
  }
}
```

### 3. **GraphQL Filtering**
Custom input types for filtering:
- `UserFilter` - Filter by name, email, city
- `PostFilter` - Filter by userId, title
- `CommentFilter` - Filter by postId, email

### 4. **GraphQL Resolvers**
Custom resolvers that:
- Fetch data from JSONPlaceholder REST API
- Apply filters dynamically
- Handle relationships between types
- Implement error handling

### 5. **GraphQL Relationships**
Implemented nested relationships:
- Posts include User information
- Comments include Post information
- Automatic resolution of related data

## 🏗️ Code Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/graphql/        # GraphQL endpoint
│   ├── posts/              # Posts page with filtering
│   ├── comments/           # Comments page with filtering
│   ├── photos/             # Photos page with filtering
│   ├── layout.tsx          # Root layout with Apollo Provider
│   ├── page.tsx            # Users page (home)
│   └── globals.css         # Global styles
├── graphql/                # GraphQL configuration
│   ├── schema.ts           # GraphQL type definitions
│   ├── resolvers.ts        # GraphQL resolvers
│   ├── datasources.ts      # Data source classes
│   └── queries.ts          # Client-side queries
└── lib/                    # Utility libraries
    ├── apollo-client.ts    # Apollo Client configuration
    └── apollo-wrapper.tsx  # Apollo Provider wrapper
```

## 🔧 GraphQL Concepts Implemented

### 1. **Type System**
- Scalar types (Int, String, Boolean)
- Object types with nested structures
- Input types for filtering
- Non-null types for required fields

### 2. **Query Operations**
- Single item queries (`user(id: Int!)`)
- List queries with filtering (`users(filter: UserFilter)`)
- Nested field resolution
- Optional parameters

### 3. **Resolvers Pattern**
```typescript
export const resolvers = {
  Query: {
    users: async (_, { filter }) => {
      // Fetch and filter users
    }
  },
  Post: {
    user: async (parent) => {
      // Resolve user for a post
    }
  }
}
```

### 4. **Data Fetching Strategies**
- **RESTDataSource**: Wrapping REST APIs with GraphQL
- **Caching**: Apollo Client built-in caching
- **Error Handling**: Graceful error management
- **Loading States**: Loading indicators

### 5. **Client-Side GraphQL**
- Apollo Client setup
- React hooks (`useQuery`)
- Variables and refetching
- Error boundaries

## 🌐 API Integration

We use **JSONPlaceholder** (https://jsonplaceholder.typicode.com/) which provides:
- 100 Users with complete profiles
- 100 Posts with user relationships
- 500 Comments linked to posts
- 5000 Photos organized in albums

## 🎨 UI Features

### Filtering Components
Each page includes sophisticated filtering:

1. **Users Page**: Filter by name, email, city
2. **Posts Page**: Filter by user ID, title
3. **Comments Page**: Filter by post ID, email
4. **Photos Page**: Filter by album ID

### Responsive Design
- Mobile-first approach
- Grid layouts that adapt to screen size
- Hover effects and transitions
- Loading spinners and error states

## 🚀 Getting Started

1. **Install Dependencies**
```bash
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

3. **Generate GraphQL Types** (Optional)
```bash
npm run codegen
```

## 📱 Pages Overview

### Home (Users)
- Displays all users with complete profiles
- Filter by name, email, or city
- Cards show address and company information

### Posts
- Blog posts with author information
- Filter by user ID or title content
- Shows post content and author details

### Comments
- All comments with post relationships
- Filter by post ID or commenter email
- Links back to original posts

### Photos
- Photo gallery with thumbnails
- Filter by album ID
- Links to full-size images

## 🔍 GraphQL Advantages Demonstrated

1. **Single Endpoint**: All data through `/api/graphql`
2. **Flexible Queries**: Fetch exactly what you need
3. **Type Safety**: Full TypeScript integration
4. **Relationships**: Automatic resolution of related data
5. **Caching**: Apollo Client handles caching automatically
6. **Real-time Updates**: Easy to extend with subscriptions

## 🛠️ Technology Stack

- **Next.js 14** - React framework with App Router
- **Apollo Server** - GraphQL server implementation  
- **Apollo Client** - GraphQL client for React
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client for REST API calls

## 📚 Learning Resources

This project demonstrates key GraphQL concepts:
- Schema definition and type system
- Resolvers and data fetching
- Client-side query management
- Filtering and relationships
- Error handling and loading states

Perfect for learning how to integrate GraphQL into a modern React application!
