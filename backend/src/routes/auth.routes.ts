import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post('/logout', (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

export = router;
