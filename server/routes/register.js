import express from 'express';
import { User } from '../models';
const router = express.Router();

//*POST login page 
router.post('/', async (req, res) => {
    if (!req.body || !(req.body && req.body.name && req.body.email && req.body.password))
        return res.status(500).json({ error: "Invalid access!"});
        
    const username = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log(username, email, password);
    try {
        const userModel = new User({username, email, password});
        const result = await userModel.save();
        if (result) {
            res.json({success: result._id});
        } else {
            res.json({error: 'Failed to register user!'});
        }
    } catch (err) {
        console.log(err);
    }
    
})
export default router;
