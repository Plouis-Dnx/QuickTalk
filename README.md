<img align='center' src="assets/logo.png" style="border-radius: 50px; margin-bottom: 10" />

[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-F5DA27?style=for-the-badge&logo=daisyui&logoColor=black)](https://daisyui.com)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com)
[![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)](https://fastify.dev)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://npmjs.com)

> [!WARNING]
> This project is currently in early development and is **not yet ready for production deployment**.
> Security features such as password hashing are not yet implemented.
---

# Table of Content
- [Description](#description)
- [What I Learned](#what-i-learned)
- [Features](#features)
  - [Coming Soon](#coming-soon)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)

<a name="description"></a>
## Description
QuickTalk is an open-source instant messaging application developed as part of my Bachelor's project. The backend is developed with NestJS coupled with Fastify and the frontend is developed with Angular.
Moreover, to ensure a fast and instant communication, I used the WebSockets with Socket.io.

<a name="what-i-learned"></a>
## What I Learned
Building QuickTalk taught me a lot about full-stack development in a concrete way. 
Among the main things I explored and learned:

- Designing a **REST API** with NestJS
- Implementing **real-time communication** with WebSockets and Socket.io
- Managing a **NoSQL database** with MongoDB
- Structuring a scalable frontend with **Angular** and a component-based architecture
- Applying **SOLID principles** throughout the development
- Setting up a development environment with **Podman** and containers

<a name="features"></a>
## Features
> QuickTalk is currently in early development. More features are planned for future versions.

- **Authentication** : Sign in with your Google account via OAuth2.0
- **Friend System** : Search and add other users from the *Add Friends* page
- **Real-time Messaging** : Send and receive instant messages powered by WebSockets
- **Contacts & Conversations** : Your contacts are displayed in the sidebar in the *Messages* page

<a name="coming-soon"></a>
### Coming Soon
- **Account Settings** : Currently, users have default settings (profile picture, biography, visibility, ...). In a future version, I plan to add a page dedicated to modifying these.

- **Share GIFs** : I plan to eventually add the possibility to send GIFs using the Giphy API.

- **Notifications** : I also want to add notifications and other interactions, such as seeing when messages are received and read, or when someone in the chat is typing.

- **Group Conversations** : In a future version, QuickTalk should allow users to create group conversations, modify the name and profile picture, add people, and more.

- **Authentication Page** : Currently, authentication is only available with Google OAuth. I plan to add a dedicated authentication page to QuickTalk, and possibly support other providers such as GitHub.

<a name="screenshots"></a>
## Screenshots
[coming soon]

<a name="getting-started"></a>
## Getting Started
This project is split into two parts, each with their own installation guide:
- [Frontend](./frontend/README.md)
- [Backend](./backend/README.md)