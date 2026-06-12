import { Router, type IRouter } from "express";
import healthRouter from "./health";
import applyRouter from "./apply";

const router: IRouter = Router();

router.use(healthRouter);
router.use(applyRouter);

export default router;
