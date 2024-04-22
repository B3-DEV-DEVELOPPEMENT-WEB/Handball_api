import { Request } from "express";

export class CreateActualiteDto {
  title: string;
  content: string;
}

export interface RequestWithUser extends Request {
  user: { userId: string };
}