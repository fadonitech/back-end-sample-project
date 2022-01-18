import {
  GraphQLUpload,
} from 'graphql-upload';

import {
  Contact,
  BlogPost,
  DraftBlogPost
} from '../models/index';

import { AWSS3Uploader } from './s3'

const s3Uploader = new AWSS3Uploader({
  accessKeyId: "",
  secretAccessKey: "",
  destinationBucketName: ''
});

export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    contacts: async () => await Contact.find().clone().catch(function (err) { console.log(err) }),
    blogPosts: async () => await BlogPost.find().clone().catch(function (err) { console.log(err) }),
    draftBlogPosts: async () => await DraftBlogPost.find().clone().catch(function (err) { console.log(err) }),
    findBlogPost: async (_, { id }) => {
      return await BlogPost.findById(id).clone().catch(function (err) { console.log(err) })
    }
  },
  Mutation: {
    // CREATE EMAIL
    createContact: async (_, {
      firstName,
      lastName,
      email,
      plan
    }) => {
      const validateEmail = await Contact.findOne({
        email: email
      })

      if (!validateEmail || validateEmail.length >= 1) {
        const contact = new Contact({
          firstName,
          lastName,
          email,
          plan
        });

        await contact.save()

        return {
          error: false,
          title: "SUCCESS!!",
          message: `Thank You For Subscribing To Our Waiting List!`,
          contact
        };
      } else {
        return {
          error: true,
          title: "Error!!",
          message: "Ups! It seems this e-mail was already registered.",
        }
      }
    },
    // CREATE DRAFT BLOG POSTS
    createDraftBlogPost: async (_, {
      title,
      description,
      author,
      time,
      date,
      content,
      image
    }) => {
      const data = await image;
      const newImage = await s3Uploader.singleFileUploadResolver.bind(s3Uploader);
      const newImageResult = await newImage(_, data);

      const draftBlogPost = new DraftBlogPost({
        title,
        isPublished: false,
        description,
        author,
        time,
        date: date.split(' ').slice(1, 4).join(' '),
        content,
        image: newImageResult.url
      });

      await draftBlogPost.save();

      return {
        error: false,
        message: "Success!!",
        draftBlogPost
      }
    },
    editDraftBlogPost: async (_, {
      id,
      title,
      description,
      author,
      time,
      date,
      content,
      image
    }) => {
      const data = await image;
      const newImage = await s3Uploader.singleFileUploadResolver.bind(s3Uploader);
      const newImageResult = await newImage(_, data);

      const post = await DraftBlogPost.findOneAndUpdate({ id }, {
        id,
        isPublished: false,
        title,
        description,
        author,
        time,
        date,
        content,
        image: newImageResult.url
      })

      return post
    },
    removeDraftBlogPost: async (_, {
      id
    }) => {
      try {
        await DraftBlogPost.deleteOne({ id })

        return {
          error: false,
          message: 'SUCCESS!!'
        }
      } catch (error) {
        return {
          error: true,
          message: "ERROR!!"
        }
      }
    },
    // CREATE BLOG POSTS
    createBlogPost: async (_, {
      title,
      description,
      author,
      time,
      date,
      content,
      image
    }) => {
      const data = await image;
      const newImage = await s3Uploader.singleFileUploadResolver.bind(s3Uploader);
      const newImageResult = await newImage(_, data);

      const blogPost = new BlogPost({
        title,
        isPublished: true,
        description,
        author,
        time,
        date: date.split(' ').slice(1, 4).join(' '),
        content,
        image: newImageResult.url
      });

      await blogPost.save();

      return {
        error: false,
        message: "Success!!",
        blogPost
      }
    },
    // REMOVE IMAGE
    removeBlogPost: async (_, {
      id
    }) => {
      try {
        await BlogPost.deleteOne({ id })

        return {
          error: false,
          message: 'SUCCESS!!'
        }
      } catch (error) {
        return {
          error: true,
          message: "ERROR!!"
        }
      }
    },
    // REMOVE IMAGE
    editBlogPost: async (_, {
      id,
      title,
      description,
      author,
      time,
      date,
      content,
      image
    }) => {
      const data = await image;
      const newImage = await s3Uploader.singleFileUploadResolver.bind(s3Uploader);
      const newImageResult = await newImage(_, data);

      const post = await BlogPost.findOneAndUpdate({ id }, {
        id,
        title,
        isPublished: true,
        description,
        author,
        time,
        date,
        content,
        image: newImageResult.url
      })

      return post
    },
    singleUpload: s3Uploader.singleFileUploadResolver.bind(s3Uploader)
  },
}
