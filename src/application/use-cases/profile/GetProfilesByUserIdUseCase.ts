import { IProfileRepository } from "../../../domain/interfaces/IProfileRepository";

export class GetProfilesByUserIdUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}
  async execute(userId: string) {
    return this.profileRepository.findByUserId(userId);
  }
}