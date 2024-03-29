<h1 align="center">
    <img
        width="35"
        alt="ts-node"
        title="ts-node"
        src="https://user-images.githubusercontent.com/12243763/33518868-6e2595c4-d76a-11e7-8260-31b4e8110c93.png"
    />
    OOP - NodeTS
</h1>

This repository is a template with all predefined structure to build Node projects with pre configured modules like:

<h2>
    <a href="https://www.typescriptlang.org/">
    <img
        height="35"
        alt="TypeScript"
        title="TypeScript"
        src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg"
    />
    TypeScript</a>,
    <a href="https://typeorm.io/">
    <img
        height="35"
        alt="TypeORM"
        title="TypeORM"
        src="https://i.ibb.co/VqLZB1X/typeorm.png"
    />
    TypeORM</a>,
    <a href="https://inversify.io/">
    <img
        height="35"
        alt="InversifyJS"
        title="InversifyJS"
        src="https://i.ibb.co/SNM0k5g/inversify.png"
    />
    InversifyJS</a>,
    <a href="http://jestjs.io/">
    <img
        height="35"
        alt="Jest"
        title="Jest"
        src="https://miro.medium.com/max/600/1*i37IyHf6vnhqWIA9osxU3w.png"
    />
    Jest</a>,
    <a href="https://nodemon.io/">
    <img
        height="35"
        alt="nodemon"
        title="nodemon"
        src="https://user-images.githubusercontent.com/13700/35731649-652807e8-080e-11e8-88fd-1b2f6d553b2d.png"
    />
    Nodemon</a>,
    <a href="https://eslint.org/">
    <img
        height="35"
        alt="Eslint"
        title="Eslint"
        src="https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/358/full/eslintlogo.png"
    />
    Eslint</a>
</h2>

## Table of contents
- [About](#about)
- [Getting Started](#getting-started)
- [Removing Example Files](#removing-example-files)

## About 

OOP - NodeTS aim to improve performance on NodeJs project kick start. Ensuring code style standards, bootstraping OOP as standard paradigm and helping with DDD approach setting up DI Container using the [InversifyJS](https://inversify.io/).

## Getting Started

This project without any changes probably will throw an error when it starts, because all the `Example` files that is related with TypeORM are not pointing to any data.

To make it simple as possible you can replace the `Example` files with something that make sense for your purpose, as they are only present to illustrate how to create these files. To see some examples of how to replace `Example` files see the [Removing Example Files](#removing-example-files) section

Install dependencies:
```bash
$ npm install
# or
$ yarn install
```

Create a `.env` file following the `.env.example` file as model.

At this point all is ready to run the project, you can:

Run using Nodemon in develop environment:
```bash
$ npm run dev
# or
$ yarn run dev
```

Run in production environment:
```bash
$ npm start
# or
$ yarn start
```

Run tests and check if all is working properly:
```bash
$ npm test
# or
$ yarn test
```

## Removing `Example` files

Let's assume that we have setting up all the Postgres stuffs and want to do some manupulation on post data, in order to do this we can delete the `Example.ts` in entities folder and then add the `Post.ts`:

```typescript
/* ----- Post.ts ----- */

@Entity()
export class Post extends BaseEntity {
  @Column({ length: 100 })
  name: string
}
```

To use this new `Post` entity created we need to remove the Controller, Service and Repository examples to create new ones that can use this new entity.

Starting with Repository the new `PostRepository.ts` will look like:
```typescript
/* ----- PostRepository.ts ----- */

export class PostRepository extends AbstractRepository<Post> {
  constructor () {
    super(Post)
  }
}
```

Then the `PostService.ts` will look like:
```typescript
/* ----- PostService.ts ----- */

export class PostService extends AbstractService<Post, PostRepository> {
  constructor (
    @inject(PostRepository)
    protected readonly postRepository: PostRepository
  ) { super(postRepository) }
}
```

And finally the `PostController.ts` as follow:
```typescript
/* ----- PostController.ts ----- */

@controller('/post')
export class PostController extends AbstractController<Post, PostService> {
  constructor (
    @inject(PostService)
    protected readonly postService: PostService
  ) { super(postService) }
}
```