# API Folder

Here gonna contains all Our API routes.

Similar to the UI view in the [app folder](../README.md) the folder gonna be the route path and gonna include one file called route.ts. Example:

Folders:

- /API
  - /articles
    - /[id]
    - /comments
  - /users
    - /login
    - [id]

will make available the api route :

- https://blog/api/articles
- https://blog/api/articles/1
- https://blog/api/articles/comments
- https://blog/api/users
- https://blog/api/users/login
- https://blog/api/users/1

each folder should contain a file called route.ts which expot NAMED function (not default). example:

/articles/route.ts:

```ts
export async function GET(request: Request) {
  console.log("In the get route");
}

export async function POST(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}
```

then if i call the route `GET https://blog/api/articles` I will trigger the GET function and then make the log.

[More details about API](https://nextjs.org/docs/app/building-your-application/routing/router-handlers)
