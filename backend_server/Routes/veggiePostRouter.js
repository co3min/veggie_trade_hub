import express from "express";
import * as veggiePostService from "../Services/veggiePostService.js";

const router = express.Router();

router.post("/newVeggiePost", veggiePostService.createVeggiePost);

router.get("/post/:veggieId", veggiePostService.getVeggiePostById);

router.get(
  "/posts/veggiePostsByUserId",
  veggiePostService.getVeggiePostByUserID
);

router.put("/post/update/:veggieId", veggiePostService.updateVeggiePost);

router.delete("/post/delete/:veggieId", veggiePostService.deleteVeggiePost);

export { router as veggiePostRouter };
