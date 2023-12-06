const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	instructor: { type: String },
	role: {
		type: String,
		enum: ["user", "instructor"], // Define the roles allowed in the dropdown
		required: true,
		default: "user", // Set a default role if none is provided
	},
	isDeleted: { type: Boolean, default: false },
	profilePicture: {
		type: String,
		default: "",
	},
	phoneNumber: { type: Number, required: true },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		role: Joi.string().valid("user", "instructor").required().label("Role"),
		profilePicture: Joi.string().allow('').optional(),
		instructor: Joi.string().allow('').optional().label('Instructor'),
		phoneNumber: Joi.string().required().label("Number")
	});

	return schema.validate(data);
};

module.exports = { User, validate };
