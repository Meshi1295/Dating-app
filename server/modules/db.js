const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: '5432',
        user: 'postgres',
        password: 'root12345',
        database: 'sevmekDB'
    }
})

// login & register
const registerUser = (firstname, lastname, email, phone, username, pass) => {
    console.log('db', firstname, lastname, email, username, pass, phone);
    return db("users_info")
        .insert([{
            firstname,
            lastname,
            email,
            username,
            phone,
            password: pass
        }])
        .returning(['user_id']);
};

const addUserToLogin = (id, userN, pass) => {
    console.log('add_user_to_login', id, userN, pass);
    return db("login")
        .insert({
            login_id: id,
            username: userN,
            password: pass
        })
        .returning(["login_id"]);
};

const checkRegistered = (userN) => {
    return db("login").select("login_id").where({ username: userN });
};

const updateLoginDate = (id, date) => {
    return db("users_info")
        .update({ last_login: date })
        .where({ user_id: id })
        .returning(["last_login"]);
};

const retrieveHashPass = (userN) => {
    return db("login").select("password").where({ username: userN });
};
// add data from personal profile page
const setImg = ({ filename, username }) => {
    console.log('value', filename, username);
    return db('users_info')
        .update({
            profileimg: filename
        })
        .where({ username: username })
        .returning('*')
}
const insertInfo = (age, job, content, username) => {
    console.log('db', age, job, content);
    return db('users_info')
        .update({
            age,
            job,
            about_myself: content
        })
        .where({ username: username })
        .returning('*')

}

const getUsers = (userN) => {
    return db('users_info')
        .where({ username: userN })
        .returning(['user_id'])

}

const getUsersCards = () => {
    return db('users_info')
        .select('*')
        .returning('*')
}

// chat
const insertMessageToDB = (message, username_from, username_to) => {
    console.log('db-message', message, username_from, username_to);
    return db('messages')
        .insert({
            message,
            username_from,
            username_to
        })
        .returning('*')
}

const getAllMessages = (username_from, username_to) => {
    return db.select('*')
        .from('messages')
        .where({ username_from, username_to })
        .union([
            db.select('*').
                from('messages')
                .where({ username_from: username_to, username_to: username_from })
        ])
        .orderBy('message_date').returning('*')
}

const getUsersMessages = (login_username) => {
    return db('messages')
        .select('username_to', 'username_from')
        .count('username_to')
        .where({ username_from: login_username })
        .groupBy(['username_to', 'username_from'])
}


module.exports = {
    registerUser,
    addUserToLogin,
    checkRegistered,
    updateLoginDate,
    retrieveHashPass,
    setImg,
    getUsers,
    getUsersCards,
    insertMessageToDB,
    insertInfo,
    getAllMessages,
    getUsersMessages
}