const express = require('express');
const http = require('http');
const env = require('dotenv');
const pword = require("p4ssw0rd");
const cors = require('cors');
const db = require('./modules/db')
const multer = require('multer')
const path = require('path');
const app = express()
const socketio = require('socket.io')
const router = require('./router');
// const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const server = http.createServer(app);
// const io = socketio(server);
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

app.use(router);
env.config();
pword.simulate();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.get('/', (req, res) => {
//     res.status(200).send('hi meshmesh :)')
// })

app.get('/infoUsers/:username', (req, res) => {
    const username = (req.params.username);
    console.log(username);
    return db.getUsers(username)
        .then(data => res.json(data))
        .catch(e => console.log(e))
})

app.get('/users', (req, res) => {
    return db.getUsersCards()
        .then(data => res.json(data))
        .catch(e => console.log(e))
})

// insert img into db
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + path.extname(file.originalname)
        cb(null, fileName);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

app.post('/api/setImg', upload.single('image'), (req, res) => {
    console.log('upload.storage.filename', req.file.filename);

    const fileName = req.file ? req.file.filename : null

    try {
        const value = { ...req.body, filename: fileName }

        db.setImg(value)
            .then(user => res.json(user))
            .catch(err => {
                res.json({ mes: err })
            })
    } catch (error) {
        res.json({ mes: error })
    }
})

//  put information to the personal profile page
app.post('/private-info-page/:username', async (req, res) => {
    console.log('private-info-page', req.body);
    console.log('username', req.params.username)

    await db.insertInfo(
        req.body.age,
        req.body.job,
        req.body.content,
        req.params.username
    )
        .then(data => {
            console.log(data);
            res.json(data)
        })
        .catch(err => {
            res.json({ mes: err })
        })
})


//register
app.post("/register", async (req, res) => {
    console.log('req.body', req.body);
    const hashPass = pword.hash(req.body.password, {
        cost: 10,
    });
    let obj = await db.registerUser(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.phone,
        req.body.username,
        hashPass
    )
        .catch((err) => {
            res.json(err.detail);
        });

    let addUser = await db
        .addUserToLogin(obj[0].user_id, req.body.username, hashPass)
        .catch((err) => {
            res.json(err.detail);
        });
    console.log("Hello you account is now created!");
    res.json(`OK Hello ${req.body.username} your ID is ${obj[0].user_id}`);
});

//login
app.post("/login", async (req, res) => {

    let passObj = await db.retrieveHashPass(req.body.username);
    try {
        if (
            pword.check(req.body.password, passObj[0].password)
        ) {
            let obj = await db
                .checkRegistered(req.body.username, req.body.password)
                .catch((err) => console.log(err));

            let currentDate = new Date();
            currentDate = currentDate.toISOString().split("T")[0];

            db.updateLoginDate(obj[0].login_id, currentDate)
                .then(console.log(" loggin information ok, i updated the  login date"))
                .catch((err) => console.log(err));

            res.json({ auth: "ok" });
        }
    } catch (err) {
        console.log(
            "login information was not ok username or password not exist",
            err
        );
        res.status(400);
        res.send("login information was not ok username or password not exist");
    }
});


app.post('/sendmessage', (req, res) => {
    console.log('message', req.body);
    db.insertMessageToDB(
        req.body.message,
        req.body.username_from,
        req.body.username_to
    )
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            console.log(err);
            res.json(err.detail);
        });
})

app.post('/allmessage', (req, res) => {
    console.log('allmessage', req.body);
    return db.getAllMessages(
        req.body.username_from,
        req.body.username_to
    )
        .then(data => res.json(data))
        .catch(e => console.log(e))
})

app.post('/usersmessages', (req, res) => {
    console.log('usersmessages', req.body);
    return db.getUsersMessages(
        req.body.login_username
    )
        .then(data => res.json(data))
        .catch(e => console.log(e))
})


// ----  with socket!!!!

// io.on('connect', (socket) => {
//     socket.on('join', ({ name, room }, callback) => {
//         const { error, user } = addUser({ id: socket.id, name, room });
//         if (error) return callback(error);

//         socket.join(user.room);

//         socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.` });
//         socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
//         io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

//         callback();
//     });

//     socket.on('sendMessage', (message, callback) => {
//         const user = getUser(socket.id);
//         io.to(user.room).emit('message', { user: user.name, text: message });
//         callback();
//     });

//     socket.on('disconnect', () => {
//         const user = removeUser(socket.id);

//         if (user) {
//             io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
//             io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
//         }
//     })
// });

// ----  with socket!!!!


server.listen(process.env.PORT, () => {
    console.log(`listen to port ${process.env.PORT}`);
})