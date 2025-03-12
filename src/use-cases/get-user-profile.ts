import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import type { User } from "@prisma/client";

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase { 
  constructor(
    private userRepostory: UsersRepository,
  ) {}

  async execute({ 
    userId
  } : GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    
    const user = await this.userRepostory.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { 
      user, 
    }
  }
}