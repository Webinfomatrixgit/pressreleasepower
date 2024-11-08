function hasRole (grantRoles) {
    return function (req, res, next) {
        if (req.decoded) {
            const role = req.decoded.role
            if (role && grantRoles.includes(role)) {
                next()
            } else {
                return res.status(403).json({
                    success: false,
                    message: 'NOT AUTHORIZED'
                })
            }
        } else {
            return res.status(401).json({
                success: false,
                message: "AUTH TOKEN IS NOT VALID"
            })
        }
    }
}
module.exports.hasRole = hasRole