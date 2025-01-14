const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./models');
const cors = require('cors');
const { verifyToken } = require('./verifyToken');
const { JWT_SECRET } = require('./config');
const upload = require('./file-upload');
const path = require("path")
const serveStatic = require('serve-static')

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "uploads" folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', serveStatic(path.join(__dirname, 'uploads')));


// Signup route
app.post('/api/signup', async (req, res) => {
    const { email, password, role = 'user' } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db.User.create({ email, password: hashedPassword, role });
        res.status(201).json({ userId: user.id, role: user.role });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'User creation failed' });
    }
});


// Login route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET);
        res.json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
});



// bookings routes

// Route to create a new booking
app.post('/api/bookings/create', verifyToken, async (req, res) => {
    const { title, startTime, endTime } = req.body;
    const userId = req.userId; // Get userId from token payload (assuming the user is authenticated)

    if (!title || !startTime || !endTime) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Create a new booking and associate it with the authenticated user
        const newBooking = await db.Booking.create({
            title,
            startTime,
            endTime,
            userId, // Associate with the userId from the token
        });

        res.status(201).json({
            message: 'Booking created successfully',
            booking: newBooking,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Route to get all bookings for the authenticated user
app.get('/api/bookings', verifyToken, async (req, res) => {
    const userId = req.userId; // Get the userId from the token (already decoded in the middleware)

    try {
        // Fetch bookings that belong to the authenticated user
        const bookings = await db.Booking.findAll({
            where: { userId },
            order: [['startTime', 'ASC']], // Optional: Sorting by start time
        });

        res.status(200).json({
            message: 'Bookings fetched successfully',
            bookings,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/api/bookings/:id', async (req, res) => {
    const bookingId = req.params.id;

    try {
        const booking = await db.Booking.findByPk(bookingId, {
            include: [
                {
                    as: 'BookingUpdates',
                    model: db.BookingUpdate,
                    include: [{ model: db.User, as: 'Sender', attributes: ['id', 'email', 'role'] }], // Include sender details
                },
            ],
        });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// Send Update API
app.post('/api/bookings/:id/update',verifyToken, upload.single('video'), async (req, res) => {
    try {
        const { id } = req.params;
        const senderId = req.userId;

        // Validate booking existence
        const booking = await db.Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Validate video file
        if (!req.file) {
            return res.status(400).json({ message: 'Video file is required' });
        }

        const videoLink = `/uploads/${req.file.filename}`;

        // Create a new booking update
        const update = await db.BookingUpdate.create({
            bookingId: id,
            senderId,
            videoLink,
        });

        res.status(201).json({
            message: 'Update successfully added.',
            update,
        });
    } catch (error) {
        console.error('Error sending update:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
