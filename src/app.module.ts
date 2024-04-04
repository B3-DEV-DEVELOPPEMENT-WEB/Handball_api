import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from './auth/auth.module';
import { MatchsModule } from './matchs/matchs.module';
import { InscriptionsModule } from './inscriptions/inscriptions.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, AuthModule, MatchsModule, InscriptionsModule],
})
export class AppModule {}
