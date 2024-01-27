import express from "express";
import { signUpSenior, signUpWorker, myPage } from "../controller/user";
import exceptionHandler from "../util/exception/exception.handler";
import { validateToken } from "../controller/auth";

const router = express();

router.post("/senior", exceptionHandler(signUpSenior));
router.post("/worker", exceptionHandler(signUpWorker));
router.get("/", validateToken, exceptionHandler(myPage));

export default router;
