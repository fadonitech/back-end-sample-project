import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar Upload

  type Query {
    contacts: [Contact!]!
    blogPosts: [BlogPost!]!
    draftBlogPosts: [DraftBlogPost!]!
    findBlogPost(
      id: ID!
    ): BlogPost!
  }

  type UploadedFileResponse {
    url: String!
  }
  
  type BlogPost {
    id: ID!
    isPublished: Boolean!
    title: String!
    description: String!
    author: String!
    time: Int!
    date: String!
    content: String!
    image: String!
  }

  type DraftBlogPost {
    id: ID!
    isPublished: Boolean!
    title: String!
    description: String!
    author: String!
    time: Int!
    date: String!
    content: String!
    image: String!
  }

  type FeedbackCreateBlogPost {
    error: Boolean
    message: String!
    blogPost: BlogPost!
  }

  type FeedbackCreateDraftBlogPost {
    error: Boolean
    message: String!
    draftBlogPost: DraftBlogPost!
  }

  type Feedback {
    error: Boolean
    message: String!
  }

  type Contact {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    plan: String!
  }

  type FeedbackRegistration {
    error: Boolean
    title: String!
    message: String!
    contact: Contact
  }

  type Mutation {
    createContact(
      firstName: String!
      lastName: String!
      email: String!
      plan: String!
    ): FeedbackRegistration!

    createDraftBlogPost(
      title: String!
      description: String!
      author: String!
      time:  Int!
      date: String!
      content: String!
      image: Upload!
    ): FeedbackCreateDraftBlogPost!
    editDraftBlogPost(
      id: ID!
      title: String
      description: String
      author: String
      time:  Int
      date: String
      content: String
      image: Upload!
    ): DraftBlogPost!
    removeDraftBlogPost(
      id: ID!
    ): Feedback!

    createBlogPost(
      title: String!
      description: String!
      author: String!
      time:  Int!
      date: String!
      content: String!
      image: Upload!
    ): FeedbackCreateBlogPost!
    editBlogPost(
      id: ID!
      title: String
      description: String
      author: String
      time:  Int
      date: String
      content: String
      image: Upload!
    ): BlogPost!
    removeBlogPost(
      id: ID!
    ): Feedback!
    singleUpload(
      file: Upload!
    ): UploadedFileResponse!
  }
`;