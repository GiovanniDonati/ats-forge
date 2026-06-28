import express from 'express';
import ProfileRoutes from './presentation/http/routes/ProfileRoutes';
import UserRoutes from './presentation/http/routes/UserRoutes';
import AuthRoutes from './presentation/http/routes/AuthRoutes';

const app = express();
app.use(express.json());

app.use('/auth', AuthRoutes);
app.use('/profiles', ProfileRoutes);
app.use('/users', UserRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
