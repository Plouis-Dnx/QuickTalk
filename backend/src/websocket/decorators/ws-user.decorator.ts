import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// Custom decorator to extract user info from WebSocket client data
export const WsUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const client = context.switchToWs().getClient(); // Get the client socket
  return client.data.user; // Return the user info attached by the authentication guard
});