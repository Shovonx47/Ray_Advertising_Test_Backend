import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { AppDataSource } from '../config/database';
import { CustomError } from '../middleware/errorHandler';

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createUser(userData: Partial<User>): Promise<User> {
    try {
      const user = this.userRepository.create(userData);
      return await this.userRepository.save(user);
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new CustomError('User with this email or phone already exists', 409);
      }
      throw new CustomError('Failed to create user', 500);
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find({
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      throw new CustomError('Failed to fetch users', 500);
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new CustomError('User not found', 404);
      }
      return user;
    } catch (error: any) {
      if (error.statusCode === 404) {
        throw error;
      }
      throw new CustomError('Failed to fetch user', 500);
    }
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    try {
      const user = await this.getUserById(id);
      
      const updatedUser = { ...user, ...userData };
      await this.userRepository.save(updatedUser);
      
      return updatedUser;
    } catch (error: any) {
      if (error.statusCode === 404) {
        throw error;
      }
      if (error.code === 'ER_DUP_ENTRY') {
        throw new CustomError('User with this email or phone already exists', 409);
      }
      throw new CustomError('Failed to update user', 500);
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      const user = await this.getUserById(id);
      await this.userRepository.remove(user);
    } catch (error: any) {
      if (error.statusCode === 404) {
        throw error;
      }
      throw new CustomError('Failed to delete user', 500);
    }
  }
}