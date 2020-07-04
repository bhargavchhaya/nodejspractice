const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into users(firstname, lastname, gender,email, password, mobile) values (?,?,?,?,?,?)`, 
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.mobile
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        ); 
    },
    getUsers: callBack => {
        pool.query(
            `select id, firstname, lastname, gender, email, mobile from users`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },    
    getUserById: (id, callBack) => {
        pool.query(
            `select * from users where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateUser: (data, callBack) => {
        pool.query(
            `update users set firstname = ?, lastname = ?, gender = ?, email = ?, mobile = ? where id = ?`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.mobile,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return ;
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteUser: (data, callBack) => {
        pool.query(
            `delete from users where id = ?`,
            [
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    getUserByEmail: (email, callBack) => {
        pool.query(
            `select * from users where email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
}; 