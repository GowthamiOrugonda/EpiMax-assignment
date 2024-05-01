const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key'; // Use a strong secret key

function authenticate(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.user = user;
        next();
    });
}

function authorize(permission) {
    return (req, res, next) => {
        const userRole = req.user.role; // Assuming the user role is stored in the token
        const permissions = {
            'create-task': ['admin'],
            'update-task': ['admin', 'user'],
            'delete-task': ['admin'],
        };

        if (!permissions[permission] || !permissions[permission].includes(userRole)) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    };
}
