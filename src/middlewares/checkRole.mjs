export function checkRole(req, res, next) {
    const { role } = req.cookies;
    console.log(role);
    if(role === 'admin') return next();
    return res.status(401).send({ error: 'Unauthorized!' });
}