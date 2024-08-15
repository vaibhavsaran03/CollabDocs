import express from "express";
const router = express.Router();
import { check, validationResult } from "express-validator";
import auth from "../middleware/auth.js";
import Document from "../schema/documentSchema.js";
import { v4 as uuidv4 } from "uuid";

//@Route GET /api/docs
//@desc Get all docs
//@access Private

router.get("/", auth, async (req, res) => {
  try {
    const docs = await Document.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(docs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@Route POST /api/docs
//@desc Create a doc
//@access Private

router.post("/", auth, async (req, res) => {
  try {
    const newDoc = new Document({
      _id: req.body._id,
      title: req.body.title || "Untitled",
      content: req.body.content || {},
      createdBy: req.user._id,
      createdAt: new Date(),
    });
    const doc = await newDoc.save();
    res.json(doc);
    console.log(doc);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// router.post("/create", auth, async (req, res) => {
//   try {
//     const newDoc = new Document({
//       title: "Untitled",
//       content: {},
//       createdBy: req.user._id,
//     });
//     const doc = await newDoc.save();
//     res.json(doc);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

//@Route GET /api/docs/:id
//@desc Get a doc by id
//@access Private

router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Document.findById(id);
    if (!doc) {
      return res.status(404).json({ msg: "Document not found" });
    }

    // Check if the document belongs to the current user
    if (doc.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    res.json(doc);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @Route PUT /api/docs/:id
// @desc Update a doc
// @access Private

// router.put("/:id", auth, async (req, res) => {
//   const { id } = req.params;
//   const { title, content } = req.body;
//   try {
//     let doc = await Document.findById(id);
//     if (!doc) {
//       return res.status(404).json({ msg: "Document not found" });
//     }
//     // Check if the document belongs to the current user
//     if (doc.createdBy.toString() !== req.user._id.toString()) {
//       return res.status(401).json({ msg: "Not authorized" });
//     }
//     doc.title = title || doc.title;
//     doc.content = content || doc.content;
//     await doc.save();
//     res.json(doc);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

//@Route DELETE /api/docs/:id
//@desc Delete a doc
//@access Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({ msg: "Document not found" });
    }
    console.log("Doc User ID:", doc.createdBy.toString());
console.log("Authenticated User ID:", req.user._id.toString());


    //Make sure user owns contact
    if (doc.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ msg: "unauthorized access" });
    }

    await Document.findByIdAndDelete(req.params.id);
    res.json({ msg: "Document removed" });
  } catch (err) {
    console.error(
      `Error while deleting document with id: ${req.params.id} - ${err.message}`
    );
    res.status(500).send("Server Error");
  }
});

export default router;
