// const jwt = require('jsonwebtoken')

// const auth = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization').replace('Bearer ', '')
//         const decoded = jwt.verify(token, 'wrtfr67d65sese54')
//         const user = await User.findOne({_id: decoded._id, 'tokens.token':token})
//         if(!user){
//             throw new Error()
//         }
//         req.token = token
//         req.user = user 
//         next()
//     } catch (error) {
//         res.status(401).send({error: 'Please authenticate'})
//     }
// }

// module.exports = auth
