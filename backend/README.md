# QuickTalk - Backend

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

## Description 
The backend was developed in TypeScript with the framework [NestJS](https://github.com/nestjs/nest) used with [Fastify](https://github.com/fastify/fastify) for better performance.  
To manage instant messages, I used the [Socket.io](https://github.com/socketio/socket.io) WebSocket library.  
For the database, I used [MongoDB](https://www.mongodb.com).

## Folder Tree Structure
```
├── src
│   ├── domain
│   │   ├── auth
│   │   │   ├── dto
│   │   │   ├── jwt-security
│   │   │   └── __tests__
│   │   ├── common
│   │   │   └── __tests__
│   │   │       └── test-utils
│   │   │           ├── fixtures
│   │   │           └── mocks
│   │   │               ├── models
│   │   │               └── services
│   │   ├── conversation
│   │   │   └── dto
│   │   ├── message
│   │   │   ├── dto
│   │   │   └── __tests__
│   │   └── user
│   │       ├── dto
│   │       └── __tests__
│   └── websocket
│       ├── decorators
│       ├── dto
│       ├── gateways
│       ├── guards
│       ├── services
│       └── __tests__
└─          └── gateways
```


## Installation
Make sure the following tools are installed on your system:
- **git**
- **Node.js / npm**
- **podman**
- **podman-compose**

### 1. Clone the project
```bash
git clone https://github.com/Plouis-Dnx/QuickTalk.git
```

### 2. Install dependencies
```bash
cd QuickTalk/backend
npm install
```

### 3. Start the database
```bash
podman-compose up -d
```
This will start MongoDB on the default port (`mongodb://localhost:27017`).  
You can stop it at any time with `podman-compose down`, and verify it is running with `podman ps`.

> **Optional:** To inspect the collected data, you can install [MongoDB Compass](https://mongodb.com/try/download/compass).

### 4. Define environment variables
In the `backend` folder, create a `.env` file with the following content:
```bash
MONGO_URI=mongodb://localhost:27017
JWT_SECRET= # generate one with: openssl rand -base64 32
GOOGLE_CLIENT_ID=957773514091-2ovknddlin6hcrvatmabqig6hq45qub0.apps.googleusercontent.com
```

### 5. Run the backend
```bash
npm run start:dev
```
The default API URL is `http://localhost:3000`.