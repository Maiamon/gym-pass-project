import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { compare } from "bcryptjs";
import type { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase { 
  constructor(
    private userRepostory: UsersRepository,
  ) {}

  async execute({ 
    email, 
    password, 
  } : AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    
    const user = await this.userRepostory.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    // Booleans => starting with "is", "has", "can", "does"

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { 
      user, 
    }
  }
}