
export const protectRoute = async (req, res, next) => {

    if (!req.auth?.userId) {
        return res.status(401).json({message:"Unauthorized - should be logged in first"});
    }

    next();
}