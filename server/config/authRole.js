
export default function authRole(Role){ 
    return (req,res,next)=>{
        const user =  req.user;
        if (user.role !== Role) {
            res.status(401).json('Not allowed')
        } else {
            next()
        }
    }
}

