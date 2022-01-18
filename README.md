# 3D CUSTOMIZABLE MOCKUPS FOR E-COMMERCES ( BACK-END APPLICATION )

The Back-End is live and you can access [right here](https://graphql-fadonitech.xyz/graphql).

## How To Install

First, you need to clone the repository. After that, you might install the dependencies with `yarn install` or simply `yarn`. Then, finally, you can run the project with `yarn start`.

## Description & Goals

This project was created with the purpose of becoming a product to e-commerce owners. Essentially, the main goal of this project was to
validate a potential market segment. **This application depends on two other projects, one of them is the front-end and the other is the dashboard**. The former can be found [right here](https://github.com/fadonitech/front-end-sample-project). And, the latter, the Business Intelligence software used to analyze the data, is unfortunately not available to the public inasmuch as it contains sensitive data of our previous users.

So, you might expect the following features from the back-end app:

- Collect E-mails and build a list.
- Create/Delete/Edit Blog Posts.
- Save blog images in AWS S3.
- Save all data on MangoDB Server.
- Hosted on AWS EC2 Instance

## What did Henry do?

As the owner of the project, I was responsible for:

- Create/Hosted the back-end on AWS EC2.
- Allowed the server to host HTTPS requests.
- Developed the entire Back-end Logic.
- Integrated AWS S3 and other services to the back-end.
- Created a Dashboard Application to visualize data.
- Integrated the back-end with the Front-end Application ( [Access The Live Version](https://www.fadonitech.com/) ).

## Technologies

This back-end app had many versions, the former was a series of Lambda Functions. So, this project is built with the latest 
technologies in the industry, it's composed of:

- Babel
- Javascript ES8+
- NodeJS
- ExpressJS
- GraphQL
- Apollo
- AWS EC2, S3, Lambda

## Outcome

On a product management stand point, this project was a complete success, we had several users signing up for the beta and a couple of investors interested in the main application. Also, an invitation to participate in an Accelerator program in New York was received. I had meetings, feedbacks, and even pitch decks. However, I failed to create traction, users were more interested in testing for trials than actually for paying a monthly subscription. Additionally, there was a few limitation on the technology I was using. For instance, users were unable to add/resize/manipulate photos into the 3D models and WebGL could only do so much. Thus, because of that and many other reasons, I had to close this application out.
