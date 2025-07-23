export function checkRole(req, res, next) {
    const { role } = req.session.user;
    if(role === 'admin') return next();
    return res.status(401).send({ error: 'Unauthorized!' });
}