import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// This decorator enlightens the code by replacing context.switchToWs().getClient().data.user
// with @WsUser() in WebSocket handlers, making it cleaner and more intuitive.

// Custom decorator to extract user info from WebSocket client data
export const WsUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const client = context.switchToWs().getClient(); // Get the client socket
  return client.data.user; // Return the user info attached by the authentication guard
});