# Toonimals Backend

This is the backend code of [https://github.com/genuinestalwart/toonimals-frontend](https://github.com/genuinestalwart/toonimals-frontend)

> *A simple cartoon-like animal listing site.*

## Technologies Used

- Node.js
- Express.js
- MongoDB

## Documentation

If you want to create this project on your own, do the following steps:

1. Create a `package.json` file with default config. Then, install the necessary packages.

    ```bash
    npm init -y
    npm i cors dotenv express mongodb nodemon
    ```

2. Then, add these scripts in there.

    ```bash
    "dev": "nodemon index.js",
    "start": "node index.js",
    ```

3. For deploying in vercel, create a `vercel.json` file with this config.

    ```json
    {
        "version": 2,
        "builds": [
            {
                "src": "./index.js",
                "use": "@vercel/node"
                }
        ],
        "routes": [
            {
                "src": "/(.*)",
                "dest": "/",
                "methods": ["GET", "POST", "PATCH", "DELETE", "OPTIONS"]
            }
        ]
    }
    ```
