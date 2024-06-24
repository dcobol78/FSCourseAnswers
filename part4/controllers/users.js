const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// POST ONE PERSON
usersRouter.post("/", async (request, response) => {
  const body = request.body;
  const isThereOne = await User.find({ username: body.username });
  if (
    !body.username ||
    !body.password ||
    body.username.length <= 3 ||
    body.password.length <= 3 ||
    isThereOne.length !== 0
  ) {
    return response.status(400).json({
      error:
        "your username and password must be at least three length and a unique username is needed",
    });
  }
  const roundTime = 10;
  const passwordHash = await bcrypt.hash(body.password, roundTime);

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  savedUser = await newUser.save();
  response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const user = await User.find({}).populate("blogs", {
    title: 1,
    url: 1,
    author: 1,
    likes: 1,
  });
  response.json(user.map((u) => u.toJSON()));
});

module.exports = usersRouter;
