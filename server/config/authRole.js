export default function authRole(Role){ 
    return (req,res,next)=>{
        const user =  req.user;
        const roles = [Role]
        console.log(roles)
        roles.map(item =>{
            if (!item.includes(user.role)) {
                res.status(401).json('Not allowed')
            } else {
                next()
            }
        })
        
    }
}

