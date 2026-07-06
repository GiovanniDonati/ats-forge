import { UserEntity } from '../../../domain/entities/User';
import { IUserRepository } from '../../../domain/interfaces/IUserRepository';

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }
}
