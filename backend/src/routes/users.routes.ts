import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.get('/:id', (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

export = router;
