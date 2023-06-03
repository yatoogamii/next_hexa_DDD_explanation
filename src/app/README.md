# APP Folder

Here gonna contains all Our routing UI/API.

# UI

Each folder is a new route of the UI. Example:

folders :

- articles
  - dashboard
  - profile
- users
  - login

gonna make available the route from the browser like:

- https://blog
- https://blog/articles/
- https://blog/articles/dashboard
- https://blog/articles/profile
- https://blog/users
- https://blog/users/login

each folder (including the app folder itself) can have 3 importants files:

- page.tsx (content the page render when you go to the route from the browser. mandatory file)
- error.tsx (content showed if an error is not caught in the page. optional file.)
- layout.tsx (content shown around the page/error.tsx if needed. It's a wrapper for the content which is optional unless for the app folder itself)

the files inside the app folder itself are little different.

- The layout.tsx is mandatory here
- error.tsx should be named global-error.tsx and will catch every error which are not caught somewhere lower in the componants. optional file. Should always be client side rendered.
- not-found.tsx shown a content if the page is not found. optional file.

More details of all that and more [here](https://nextjs.org/docs/app/building-your-application/routing).

# Page

Inside a Page component we should return a default function.
This component can be [client or server](https://nextjs.org/docs/app/building-your-application/rendering) side rendered according to our need. By default it's server side rendered. If we need a dynamic content (by using React hooks for example) then you should put this component as client side rendered.

# API

The routing API is inside the /api folder. Go [inside](api/README.md) for more details.
