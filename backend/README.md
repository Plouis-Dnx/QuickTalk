# QuickTalk - Back-End

## Description 
Backend was developed with in TypeScript with the framework NestJS used with Fastify for a better performance.  
To manage instant messages, I used the websocket library Socket.IO. 
MongoDB is used to save data.

## Folder tree structure
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
To proceed to a proper installation, make sure the following packages are installed on your system :  
 - **git**
 - **npm**
 - **podman**
 - **podman-compose**  
You can install it easily by using your default system package manager such as apt (Ubuntu) or dnf (Fedora)

### 1. Clone the project
Open your terminal and run the following command :  
```bash
git clone https://github.com/Plouis-Dnx/QuickTalk.git
```

### 2. Install dependencies
Move into the folder QuickTalk that you've just cloned by using the ```cd``` command in your terminal. Continue with :  
```bash
cd backend
npm install
```

### 3. Install the database
Then, you will need to install the MongoDB database. You can do it by running the following command :  
```bash
podman-compose up -d
```
This will start MongoDB on the default port (mongodb://localhost:27017). You can stop it whenever you want by typing
```bash
podman-compose down
```

Of course, you can check if it works corretly  by using this command
```bash
podman ps
```

After this, you can check the collected data by installing [the official MongoDB GUI : MongoDB Compass](https://mongodb.com/try/download/compass)

### 4. Define environment variables
In the *backend* folder, create a new file and name it **.env**.
Copy/Paste this in it : 
```bash
MONGO_URI=
JWT_SECRET=
GOOGLE_CLIENT_ID=957773514091-2ovknddlin6hcrvatmabqig6hq45qub0.apps.googleusercontent.com
```

 - *MONGODB_URI*: the link to the database. By default, it is ```mongodb://localhost:27017``` but you can modify it as you wish.
 - *JWT_SECRET*: In you terminal, type the command :
```bash
openssl rand -base64 32
```
 - *GOOGLE_CLIENT_ID*: this value identifies QuickTalk to Google during the sign-in process. When a user logs in with Google, the client ID lets Google confirm that the request comes from QuickTalk and returns the user's verified Google identity. QuickTalk then uses this identity to either create a new account or match an existing one. It ensures that only authenticated, registered users can access the app, preventing unauthorized access.

### 5. Run the backend
In your terminal, type the following command  
```bash
npm run start:dev
```

The default API url is ```http://localhost:3000```