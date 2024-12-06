import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { firstValueFrom } from 'rxjs';
import { envs } from 'src/config/envs';
import { NATS_SERVICE } from 'src/config/services';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {
    super({
      clientID: envs.GOOGLE_CLIENT_ID,
      clientSecret: envs.GOOGLE_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const user = await firstValueFrom(
      this.client.send('validateGoogleUser', {
        email: profile.emails[0].value,
        informationUser: {
          name: profile.name.givenName,
          lastname: profile.name.familyName,
        },
      }),
    );

    return user;
  }
}
