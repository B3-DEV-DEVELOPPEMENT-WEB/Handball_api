import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as swaggerJsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'NestJS API',
      version: '1.0.0',
      description: 'API for NestJS',
    },

  },
  apis: ['./**/*.ts'],
};

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Authenticate user and retrieve token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentication successful, returns access and refresh tokens.
 *       401:
 *         description: Authentication failed.
 *
 *   get:
 *     summary: Check if the user is authorized.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User is authorized.
 *       401:
 *         description: Unauthorized or token expired.
 *
 * /auth/refresh_token:
 *   post:
 *     summary: Refresh authentication token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refresh_token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refreshed successfully.
 *       401:
 *         description: Invalid or expired refresh token.
 *
 * /users:
 *   post:
 *     summary: Register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Error in user data.
 *
 *   get:
 *     summary: Retrieve all users.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully.
 *       401:
 *         description: Unauthorized.
 *
 * /users/{userId}:
 *   get:
 *     summary: Retrieve a single user by ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data retrieved successfully.
 *       404:
 *         description: User not found.
 *
 * /matchs:
 *   post:
 *     summary: Create a match.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *               opponent:
 *                 type: string
 *               score:
 *                 type: string
 *     responses:
 *       201:
 *         description: Match created successfully.
 *
 *   put:
 *     summary: Update match details.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: string
 *     responses:
 *       200:
 *         description: Match updated successfully.
 *
 * /matchs/inscription/{matchId}:
 *   put:
 *     summary: Sign up for a match.
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Signed up successfully.
 *
 * /matchs/desinscription/{matchId}:
 *   put:
 *     summary: Unsubscribe from a match.
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Unsubscribed successfully.
 *
 * /actualite:
 *   post:
 *     summary: Create a news item.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: News item created successfully.
 *
 *   get:
 *     summary: Get all news items.
 *     responses:
 *       200:
 *         description: Retrieved all news items successfully.
 */


const swaggerDocs = swaggerJsdoc(swaggerOptions);
console.log(swaggerDocs);


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    disableErrorMessages: false,
  }));

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  app.use('/api-docs', serve, setup(swaggerDocs));

  await app.listen(3000);
}

bootstrap();
