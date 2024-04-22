import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from './auth/auth.module';
import { MatchsModule } from './matchs/matchs.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, AuthModule, MatchsModule],
})
export class AppModule {}
