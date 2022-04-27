const express = requre('express');
const router = express.Router();

const bcrypt = require ('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const db = require('../'); //aqui que onda?
const userMiddleware = require('../middleware/users.js');
const { validateRegister } = require('../middleware/users.js');
const { route } = require('./invoice');

router.post('/sign-up', validateRegister, (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(
            req.body.username
          )});`,
          (err, result) => {
              if (result.length){
                  return res.status(409).send({
                      msg: '¡Este usuario ya está registrado!'
                  });
              } else {
                  bcrypt.hash(req.body.password, 10, (err, hash) => {
                      if(err) {
                          return res.status(500).send({
                              msg: err
                          });
                      } else {
                          console.log(hash);
                          db.query(
                            `INSERT INTO users (id, username, password, registered) VALUES ('${uuid.v4()}', ${db.escape(
                                req.body.username
                              )}, ${db.escape(hash)}, now())`,
                              (err, result) => {
                                  if (err) {
                                      throw err;
                                      return res.status(400).send({
                                          msg: err
                                      });
                                  }
                                  return res.status(201).send({
                                      msg: 'Registrado!'
                                  });
                              }
                          );
                      }
                  });
              }
          }
    );
});

router.post('/login', (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE username = ${db.escape(req.body.username)}`,
        (err, result) => {
            //user does not exist
            if(err) {
                throw err;
                return res.status(400).send({
                    msg: err
                });
            }

            if(!result.length) {
                return res.status(401).send({
                    msg: '¡El usuario o la contraseña son incorrectos!'
                });
            }

            //check password
            bcrypt.compare(
                req.body.password,
                result[0]['password'],
                (bErr, bResult) => {
                    //wrong password
                    if(bErr) {
                        throw bErr;
                        return res.status(401).send({
                            msg: '¡El usuario o la contraseña son... incorrectos!' 
                        });
                    }

                    if(bResult) {
                        const token = jwt.sign({
                            username: result[0].username,
                            userId: result[0].id
                        },
                        'SECRETKEY', {
                            expiresIn: '10m'
                        }
                        );

                        db.query(
                            `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
                        );
                        return res.status(200).send({
                            msg: 'Haz iniciado sesión!',
                            token,
                            user: result[0]
                        });
                    }
                    return res.status(401).send({
                        msg: '¡El usuario o la contraseña son incorrectos!'
                    });
                }
            );
        }
    );
});

router.get('/secret')