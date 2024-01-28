import express from "express";
import * as veggiePostService from "../Services/veggiePostService.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post("/newVeggiePost", veggiePostService.createVeggiePost);

router.get("/post/:veggieId", veggiePostService.getVeggiePostById);

router.get("/allPosts", veggiePostService.getAllVeggiePosts);

router.get(
  "/posts/veggiePostsByUserId",
  veggiePostService.getVeggiePostByUserID
);

router.put("/post/update/:veggieId", veggiePostService.updateVeggiePost);

router.delete("/post/delete/:veggieId", veggiePostService.deleteVeggiePost);

router.post(
  "/upload",
  upload.array("images", 5),
  veggiePostService.uploadImage
);

export { router as veggiePostRouter };
