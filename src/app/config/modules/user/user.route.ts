import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// router.route("/").get()

router.post('/create-user', UserControllers.createUser);

export const UserRoutes = router;
