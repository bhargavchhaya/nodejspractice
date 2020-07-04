const { create, getUsers, getUserById, updateUser, deleteUser, getUserByEmail } = require('./user.service');

const { genSaltSync, hashSync, compareSync } = require('bcrypt');

const { sign } = require('jsonwebtoken');

module.exports = {
    createUser : (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection Error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: results
            });
        });
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection Error"
                });
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "No Records Found"
                });
            }
            return res.json({
                success: 1,
                message: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err)
                return ;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "No Records Found"
                });
            }
            return res.json({
                success: 1,
                message: results
            });
        })
    },
    updateUser: (req, res) => {
        const body = req.body;
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err)
                return ;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "No Records Found"
                });
            }
            return res.json({
                success: 1,
                message: "Record Updated Successfully"
            });
        });
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err)
                return ;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "No Records Found"
                });
            }
            return res.json({
                success: 1,
                message: "User deleted successfully"
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, process.env.KEY, {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "Login Successful",
                    token: jsontoken
                });
            }else{
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        });
    }
};