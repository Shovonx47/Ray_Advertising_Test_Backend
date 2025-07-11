import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';
import { validateCreateUser, validateUpdateUser } from '../validation/userValidation';
import { CustomError } from '../middleware/errorHandler';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validation = validateCreateUser(req.body);
      
      if (!validation.success) {
        throw new CustomError(validation.error.issues[0].message, 400);
      }

      const user = await this.userService.createUser(validation.data);
      
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

      const validation = validateUpdateUser(req.body);
      
      if (!validation.success) {
        throw new CustomError(validation.error.issues[0].message, 400);
      }

      if (Object.keys(validation.data).length === 0) {
        throw new CustomError('No valid fields provided for update', 400);
      }

      const user = await this.userService.updateUser(id, validation.data);
      
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