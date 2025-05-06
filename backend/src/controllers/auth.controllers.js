import { User } from "../models/user.model.js";

export const authCallback =  async (req, res) => {
    try {
        const { id, name} = req.body;

        const user = await User.findOne({clerkId: id});

        if (!user) {
            await User.create({
                clerkId:id,
                name,
            })    
        }

        res.status(200).json({success:true})
    } catch (error) {
        console.log("Error in authCallback controller",error);
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
}