import express, { Application } from 'express';
import { UserRoutes } from './app/config/modules/user/user.route';

const app: Application = express();

app.use(express.json());

// api/users/create-user

// application routes
app.use('/api/users', UserRoutes);

export default app;
