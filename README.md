# skulmina Codebase Documentation

## Table of Contents
- [Introduction](#introduction)
- [Setup](#setup)
- [Defining Routing](#defining-routing)
- [Navigation Between Routes](#navigation-between-routes)
- [Calling API](#calling-api)

## Introduction
Welcome to the comprehensive documentation for the codebase of the "skulmina" project. This document provides an in-depth overview of the core components, functions, and usage scenarios that form the foundation of the application.

## Setup
To begin working with the "skulmina" project, follow these steps:

1. Clone the project repository to your local development environment.
2. Open a terminal window and navigate to the project directory.
3. Execute the following command to install the necessary dependencies:
   ```
   npm install
   ```

## Defining Routing
Routing is a crucial aspect of the "skulmina" project as it defines how different parts of the application are accessed. Route definitions are managed in the `src/config/routes.tsx` file. Each route includes a name, URL, corresponding component, and access permissions.

### Route Configuration
Route configuration follows a specific structure:

```js
import { About, Dashboard } from "@/pages";

const routes: Record<string, RouteConfig> = {
    'home': {
        url: "/",
        component: () => <h1>Hello World</h1>,
    },
    'page.about': {
        url: "/about",
        component: About,
        access: "guest", // accessible only to unauthenticated users
    },
    'dashboard': {
        url: "/admin/dashboard",
        component: Dashboard,
        access: "auth", // accessible only to authenticated users
    },
    // ...other routes
};
```

### Access Permissions
Access to routes is controlled by the `access` key. Options include:
- `auth`: Only authenticated users can access the route.
- `guest`: Only unauthenticated users can access the route.
- If no `access` key is provided, the route can be accessed publicly.

## Navigation Between Routes
For consistent and maintainable navigation, dynamic URL generation is recommended over hardcoding URLs. This approach simplifies updating URLs across the application.

### Dynamic URL Generation
Use the `route` function to generate URLs dynamically based on route names:

```js
route('page.about') // returns: /about
```

### Implementation Example
Utilize the `route` function along with the `react-router-dom` library for seamless navigation:

```js
import route from "@/helpers/route";
import { Link } from 'react-router-dom';
import { routeNames } from '@/config/routes';

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><Link to={route('home')}>Home</Link></li>
                <li><Link to={route('page.about')}>About</Link></li>
            </ul>
        </nav>
    );
};
```

## Calling API
Interacting with the API is fundamental to the "skulmina" project. API endpoints are organized within the `services/Api` folder and can be accessed through `services/Api/index.tsx`.

### Creating and Fetching Posts
Example of creating and fetching posts using API endpoints:

```js 
import request from "@/services/Api/base";

export const createPost = async (data: { title: string; content: string }) =>
    (await request.post("/posts", data)).data;

export const getPosts = async () =>
    (await request.get("/posts")).data;
```

### Utilizing the API
The application uses the React Query library to manage API requests efficiently:

```js
import { useQuery } from "react-query";
import { getPosts } from "@/services/Api";
import { Post } from "@/components";

function PostList() {
    const { data: posts } = useQuery('posts', getPosts);

    return (
        <div>
            {posts.map((post) => <Post key={post.id} post={post} />)}
        </div>
    )
}
```