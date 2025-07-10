import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';
import { createUserSchema, updateUserSchema } from '../validation/userValidation';
import { CustomError } from '../middleware/errorHandler';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { error, value } = createUserSchema.validate(req.body);
      
      if (error) {
        throw new CustomError(error.details[0].message, 400);
      }

      const user = await this.userService.createUser(value);
      
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      
      res.status(200).json({
        success: true,
        message: 'Users retrieved successfully',
        data: users,
        count: users.length,
      });
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        throw new CustomError('Invalid user ID', 400);
      }

      const user = await this.userService.getUserById(id);
      
      res.status(200).json({
        success: true,
        message: 'User retrieved successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        throw new CustomError('Invalid user ID', 400);
      }

      const { error, value } = updateUserSchema.validate(req.body);
      
      if (error) {
        throw new CustomError(error.details[0].message, 400);
      }

      if (Object.keys(value).length === 0) {
        throw new CustomError('No valid fields provided for update', 400);
      }

      const user = await this.userService.updateUser(id, value);
      
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        throw new CustomError('Invalid user ID', 400);
      }

      await this.userService.deleteUser(id);
      
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}