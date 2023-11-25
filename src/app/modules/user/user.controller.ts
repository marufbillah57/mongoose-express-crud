import { Request, Response } from 'express';
import { userServices } from './user.service';
import { userValidationSchema } from './user.validation';
import { User } from './user.model';
import { TUserPartial } from './user.interface';
import hash from '../utils/passwordHash';
import { orderValidationSchema } from './order.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    // data validation using zod
    const zodData = userValidationSchema.parse(user);

    // will call service func to send this data
    const result = await userServices.createUserIntoDB(zodData);

    // remove the unwanted fields
    const tempUser: TUserPartial = JSON.parse(JSON.stringify(result));
    delete tempUser.password;
    delete tempUser.orders;

    // send response
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: tempUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create new user!',
      error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    if (await User.findByUserId(userId)) {
      const result = await userServices.getSingleUserFromDB(userId);

      return res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error occurred!', error });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const updatedData = req.body;

    // if password updated then hash it before update
    if (updatedData.password) {
      updatedData.password = await hash(updatedData.password);
    }

    if (await User.findByUserId(userId)) {
      await userServices.updateSingleUserFromDB(userId, updatedData);

      const result = await User.findOne({ userId }).select(
        '-password -orders -_id -__v -fullName._id -address._id',
      );
      return res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: result,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error Occurred!',
      error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    if (await User.findByUserId(userId)) {
      await userServices.deleteUserFromDB(userId);

      return res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error occurred!',
      error,
    });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    // validate the order data coming from request body
    const validateOrder = orderValidationSchema.parse(req.body);

    if (await User.findByUserId(userId)) {
      await userServices.createOrderOfUser(userId, validateOrder);

      return res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: null,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error occurred!',
      error,
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    if (await User.findByUserId(userId)) {
      const orders = await userServices.getAllOrdersOfUser(userId);

      return res.status(200).json({
        success: true,
        message: 'Order fetched successfully',
        data: orders,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error occurred!',
      error,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteUser,
  createOrder,
  getOrders,
};
