import express from 'express';
import * as userController from '../controllers/user.controller';
const router = express.Router();

router.route('/').get(userController.getAll);
router.route('/unique/:username').get(userController.checkUnique);

export default router;
