# 📡 WebSocket Module

This directory contains all WebSocket-related logic for the application.  
It is organized following SOLID principles and clean architecture to ensure clear separation of responsibilities, scalability, and maintainability.

---

## 📁 Folder Structure

### **`gateways/`**
Contains all WebSocket gateways.  
A gateway is the entry point for WebSocket communication, similar to an HTTP controller.  
Gateways are responsible for:
- Listening to incoming WebSocket events  
- Validating incoming payloads  
- Calling WebSocket services  
- Emitting events back to clients  

Gateways must **not** contain business logic.

---

### **`services/`**
Contains WebSocket-specific services.  
These services handle:
- Real-time communication logic  
- Broadcasting events  
- Managing rooms and socket groups  
- Interacting with domain services (messages, conversations, users, etc.)

They act as an intermediary between gateways and the domain layer.

---

### **`dto/`**
Contains Data Transfer Objects used to validate WebSocket payloads.  
DTOs ensure that incoming data is structured and validated before being processed.

---

### **`guards/`**
Contains WebSocket guards.  
Guards are used to protect WebSocket gateways, typically by validating authentication tokens (e.g., JWT) during the handshake phase.

---

### **`decorators/`**
Contains custom decorators used inside gateways.  
For example, decorators can extract the authenticated user from the WebSocket context.

---

### **`adapters/`**
Contains custom WebSocket adapters if the application needs to override or extend the default Socket.IO behavior (e.g., custom handshake logic, CORS configuration, or multi-server scaling).

---

### **`websocket.module.ts`**
The main module that bundles all WebSocket-related components.  
It imports domain modules (auth, user, conversation, message) and exposes gateways, services, and guards.

---

## 🧭 Purpose

This module provides a clean, isolated layer dedicated to real-time communication.  
It ensures that:
- WebSocket logic stays separate from HTTP controllers  
- Real-time features remain easy to maintain  
- Authentication and event handling are consistent across the application  