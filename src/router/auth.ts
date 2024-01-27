import express from "express";
import exceptionHandler from "../util/exception/exception.handler";
import { signIn } from "../controller/auth";

const router = express();

router.post("/signin", exceptionHandler(signIn));

export default router;