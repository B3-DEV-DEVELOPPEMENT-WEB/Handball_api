import { Request } from "express";

export class CreateMatchDto {
  date: string;
  score?: string;
  opponent?: string;

}

export interface AuthenticatedRequest extends Request {
  user: { userId: string };
}