// google-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleAuthGuard implements CanActivate {
  private readonly googleOAuthClient: OAuth2Client;

  constructor() {
    // Initialize the Google OAuth client with your client ID
    this.googleOAuthClient = new OAuth2Client({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: process.env.GOOGLE_CALLBACK_URL,
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { headers } = ctx.getContext().req;

    const token = headers.authorization.replace('Bearer ', '');
    if (!token) {
      // If the token is missing, throw UnauthorizedException
      throw new UnauthorizedException('Authorization token is missing');
    }

    // Validate the Google access token
    const isValid = await this.validateGoogleToken(token);

    if (!isValid) {
      // If the token is invalid, throw UnauthorizedException
      throw new UnauthorizedException('Invalid Google access token');
    }
    ctx.getContext().req.user = isValid;
    return true;
  }

  private async validateGoogleToken(token: string): Promise<any> {
    try {
      const ticket = await this.googleOAuthClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      return payload;
    } catch (error) {
      // Handle token validation errors
      console.error('Google token validation error:', error.message);
      // Throw UnauthorizedException when token validation fails
      throw new UnauthorizedException('Invalid Google access token');
    }
  }
}
