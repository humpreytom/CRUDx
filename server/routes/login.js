import express from 'express';

const router = express.Router();


/* POST login page */



router.post('/', (req, res) => {
  // i process ang req.body
  console.log(req.body);
  res.json({ success: true, _id: 'TOM AND ABBY'});
})



export default router;
