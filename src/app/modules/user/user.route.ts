import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// router.route("/").get()

router.post('/create-user', UserControllers.createUser);

router.get('/', UserControllers.getAllUsers);

router.get('/:userId', UserControllers.getSingleUser);

router.put('/:userId', UserControllers.updateSingleUser);

router.delete('/:userId', UserControllers.deleteUser);

router.put('/:userId/orders', UserControllers.createOrder);

router.get('/:userId/orders', UserControllers.getOrders);

// router.get('/:userId/orders/total-price')

export const UserRoutes = router;
