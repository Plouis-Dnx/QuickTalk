# QuickTalk - Frontend
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-F5DA27?style=for-the-badge&logo=daisyui&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io--client-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

## Description
The frontend was developed with the framework [Angular](https://angular.dev) and bundled with [Vite](https://vite.dev).
I also used [TailwindCSS](https://tailwindcss.com) paired with the plugin [DaisyUI](https://daisyui.com).
Moreover, to interact with the WebSockets managed on the backend side of the application, I used the [Socket.io](https://github.com/socketio/socket.io) client.

## Folder Tree Structure

```bash
└── src
    ├── app
    │   ├── core
    │   │   ├── api
    │   │   ├── dto
    │   │   └── interceptors
    │   ├── features
    │   │   ├── auth
    │   │   │   ├── constants
    │   │   │   ├── dto
    │   │   │   └── pages
    │   │   │       └── login
    │   │   └── main
    │   │       └── pages
    │   │           ├── add-friends
    │   │           │   └── components
    │   │           │       └── user-item
    │   │           └── messages
    │   │               └── components
    │   │                   ├── contact-item
    │   │                   ├── contacts-sidebar
    │   │                   └── conversation-display
    │   └── shared
    │       ├── components
    │       │   ├── loading
    │       │   └── navbar
    │       ├── models
    │       └── services
    └── environments
```

## Installation
Make sure the following tools are installed on your system:
- **git**
- **Node.js / npm**

### 1. Clone the project
Open your terminal and run the following command:
```bash
git clone https://github.com/Plouis-Dnx/QuickTalk.git
```

### 2. Install dependencies
```bash
cd QuickTalk/frontend
npm install
```

### 3. Define environment variables
Copy the example files and fill in the values:
```bash
cp src/environments/environment.ts.example src/environments/environment.ts
cp src/environments/environment.development.ts.example src/environments/environment.development.ts
cp src/environments/environment.production.ts.example src/environments/environment.production.ts
```

### 4. Run the frontend
```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.  
The application will automatically reload whenever you modify any of the source files.