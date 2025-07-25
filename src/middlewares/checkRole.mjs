export function checkRole(req, res, next) {
    const { role } = req.user;
    if(role === 'admin') return next();
    return res.status(401).send({ error: 'Unauthorized!' });
}