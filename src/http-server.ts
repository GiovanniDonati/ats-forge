import express from 'express';
import ProfileRoutes from './presentation/routes/ProfileRoutes';
import UserRoutes from './presentation/routes/UserRoutes';
import AuthRoutes from './presentation/routes/AuthRoutes';

const app = express();
app.use(express.json());

app.use('/auth', AuthRoutes);
app.use('/profiles', ProfileRoutes);
app.use('/users', UserRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
