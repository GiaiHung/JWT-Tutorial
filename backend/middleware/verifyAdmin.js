const verifyAdmin = (req, res, next) => {
    if(req.user.id === req.params.id || req.user.admin) {
        next()
    } else {
        res.status(403).json({message: 'Sorry, you are not allowed other user.'})
    }
}

module.exports = verifyAdmin