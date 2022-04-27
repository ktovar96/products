const jwt = require("jsonwebtoken");

    module.exports = {
    validateRegister: (req, res, next) =>{
        console.log(req.body);
        if (!req.body.username || req.body.username.length < 3) {
            return res.status(400).send({
                msd: 'Por favor ingresa un nombre de usuario con un minimo 3 caracteres'
            });
        }

        if (!req.body.password || req.body.password.length < 6) {
            return res.status(400).send({
                msg: 'Por favor ingresa una contraseña con un minimo de 6 caracteres'
            });
        }

        if (!req.body.password_repeat || req.body.password != req.body.password_repeat) {
            return res.status(400).send({
                msg: 'Ambas contraseñas deben coincindir'
            });
        }
        next();
    },

    isLoggedIn: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(
                token,
                'SECRETKEY'
            );
            req.userData = decoded;
            next();
        } catch (err) {
            return res.status(401).send({
                msg: '!Tu sesión no es valida!'
            });
        }
    }
}