const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: './uploads/',
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({
	storage: storage,
	limits: { fileSize: 5000000 }, // Limit file size to 1MB
}).single('profilePicture'); // 'profilePicture' should match the name attribute in the form input


router.post("/register", async (req, res) => {
	try {
		upload(req, res, async (err) => {
			if (err) {
				console.error(err);
				res.status(500).json({ message: 'Error uploading file' });
			} else {
				const { error } = validate(req.body);
				if (error)
					return res.status(400).send({ message: error.details[0].message });

				const user = await User.findOne({ email: req.body.email });
				if (user)
					return res
						.status(409)
						.send({ message: "User with given email already Exist!" });

				const salt = await bcrypt.genSalt(Number(process.env.SALT));
				const hashPassword = await bcrypt.hash(req.body.password, salt);

				await new User({ ...req.body, password: hashPassword, profilePicture: req.file ? req.file.path : '' }).save();
				res.status(201).send({ message: "User created successfully" });
			}
		})
	} catch (error) {
		console.log(error)
		res.status(500).send({ [message]: error });
	}
});

router.put('/:userId/delete', async (req, res) => {
	try {
		const userId = req.params.userId;

		// Find the user by ID
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Update user with soft delete fields
		user.isDeleted = true;

		// Save the updated user document
		await user.save();

		res.json({ message: 'User soft deleted', user });
	} catch (error) {
		console.error('Error deleting user:', error);
		res.status(500).json({ message: 'Server error' });
	}
});

router.get('/findAll', async (req, res) => {
	try {
		// Find all users where isDeleted is false
		const activeUsers = await User.find({ isDeleted: false });

		res.json(activeUsers);
	} catch (error) {
		console.error('Error fetching active users:', error);
		res.status(500).json({ message: 'Server error' });
	}
});

router.get('findById/:userId', async (req, res) => {
	try {
		const userId = req.params.userId;

		// Find the user by ID
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.json(user);
	} catch (error) {
		console.error('Error finding user:', error);
		res.status(500).json({ message: 'Server error' });
	}
});

router.put('/update/:userId', async (req, res) => {
	try {
		const userId = req.params.userId;
		const newData = req.body; // New data to update

		// Find the user by ID and update the data
		const user = await User.findByIdAndUpdate(userId, newData, { new: true });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.json({ message: 'User updated successfully', user });
	} catch (error) {
		console.error('Error updating user:', error);
		res.status(500).json({ message: 'Server error' });
	}
});


// Find users by role
router.post('/findByRole', async (req, res) => {
	try {
		// const { error } = validate(req.body.instructor);
		console.log(req.body.userRole);
		const role = req.body.userRole
		if (!['user', 'instructor'].includes(role)) {
			return res.status(400).json({ message: 'Invalid role' });
		}

		// Find users by role
		const usersByRole = await User.find({ role });

		res.json(usersByRole);
	} catch (error) {
		console.error('Error finding users by role:', error);
		res.status(500).json({ message: 'Server error' });
	}
});

router.post('/findByName', async (req, res) => {
	const nameToFind = req.body.name;
	if (!nameToFind) {
		return res.status(400).json({ message: 'Name parameter is required' });
	}
	try {
		const foundData = await User.find({ firstName: nameToFind });
		console.log(foundData, "foundDatafoundDatafoundDatafoundDatafoundDatafoundDatafoundData")
		if (foundData.length === 0) {
			return res.status(404).json({ message: 'Data not found' });
		}
		res.json(foundData);
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ message: 'Server error' });
	}
});


module.exports = router;