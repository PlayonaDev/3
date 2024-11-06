import { User as PrismaUser } from "@prisma/client";
import { Question } from "src/questions/entities/question.entity";

export class User implements PrismaUser {
    name: string;
    id: number;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
