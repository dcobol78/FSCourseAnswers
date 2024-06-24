const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const User = require("../models/user");
const bcrypt = require("bcrypt");

describe("when one user in database", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("hehe", 10);
    const user = new User({
      username: "kkkk",
      passwordHash,
    });
    await user.save();
  });

  test("create a blog > try to remove it with random person", async () => {
    const oriUser = {
      username: "xdxdxdxdxd",
      name: "kokok",
      password: "asdasdasd",
    };
    const fakeUser = {
      username: "sssssssss",
      name: "sssssss",
      password: "asdasssssdasd",
    };
    await api.post("/api/users").send(oriUser).expect(201);
    await api.post("/api/users").send(fakeUser).expect(201);

    const oriToken = await api.post("/api/login").send({
      username: oriUser.username,
      password: oriUser.password,
    });

    const fakeToken = await api.post("/api/login").send({
      username: fakeUser.username,
      password: fakeUser.password,
    });

    const blog = {
      title: "xdasdaasdada",
      author: "asdasdaas",
      url: "asdasfafa",
      likes: 0,
    };

    const post = await api
      .post("/api/blogs")
      .send(blog)
      .set("Authorization", "bearer " + oriToken.body.token)
      .expect(201);
    const blogsBefore = await helper.blogsInDb();

    await api
      .delete(`/api/blogs/${post.body.id}`)
      .set("Authorization", "bearer " + fakeToken.body.token)
      .expect(401);
    const blogsAfter = await helper.blogsInDb();
    expect(blogsAfter).toHaveLength(blogsBefore.length);
  });

  test("when unauthorized user tries to add blog", async () => {
    const blogsBefore = await helper.blogsInDb();
    const blog = {
      title: "xdasdaasdada",
      author: "asdasdaas",
      url: "asdasfafa",
      likes: 0,
    };
    await api.post("/api/blogs").send(blog).expect(401);

    const blogsAfter = await helper.blogsInDb();
    expect(blogsAfter).toHaveLength(blogsBefore.length);
  });

  test("create a blog > try to remove it with who created it", async () => {
    const user = {
      username: "xdxdxdxdxd",
      name: "kokok",
      password: "asdasdasd",
    };
    await api.post("/api/users").send(user).expect(201);
    const userToken = await api.post("/api/login").send({
      username: user.username,
      password: user.password,
    });

    const blog = {
      title: "xdasdaasdada",
      author: "asdasdaas",
      url: "asdasfafa",
      likes: 0,
    };

    const post = await api
      .post("/api/blogs")
      .send(blog)
      .set("Authorization", "bearer " + userToken.body.token)
      .expect(201);
    const blogsBefore = await helper.blogsInDb();

    await api
      .delete(`/api/blogs/${post.body.id}`)
      .set("Authorization", "bearer " + userToken.body.token)
      .expect(204);
    const blogsAfter = await helper.blogsInDb();
    expect(blogsAfter).toHaveLength(blogsBefore.length - 1);
  });

  test("when unauthorized user tries to add blog", async () => {
    const blogsBefore = await helper.blogsInDb();
    const blog = {
      title: "xdasdaasdada",
      author: "asdasdaas",
      url: "asdasfafa",
      likes: 0,
    };
    await api.post("/api/blogs").send(blog).expect(401);

    const blogsAfter = await helper.blogsInDb();
    expect(blogsAfter).toHaveLength(blogsBefore.length);
  });

  test("when authorized user tries to add blog", async () => {
    const user = {
      username: "xdxdxdxdxd",
      name: "kokok",
      password: "asdasdasd",
    };
    await api.post("/api/users").send(user).expect(201);
    const userToken = await api.post("/api/login").send({
      username: user.username,
      password: user.password,
    });

    const blogsBefore = await helper.blogsInDb();

    const blog = {
      title: "xdasdaasdada",
      author: "asdasdaas",
      url: "asdasfafa",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .send(blog)
      .set("Authorization", "bearer " + userToken.body.token)
      .expect(201);

    const blogsAfter = await helper.blogsInDb();
    expect(blogsAfter).toHaveLength(blogsBefore.length + 1);
  });

  test("when random nonuser tries to login", async () => {
    const user = {
      username: "xdxdxdxdxd",
      name: "kokok",
      password: "asdasdasd",
    };

    await api.post("/api/login").send({}).expect(401);
  });

  test("when signed up user tries to login", async () => {
    const user = {
      username: "xdxdxdxdxd",
      name: "kokok",
      password: "asdasdasd",
    };

    await api.post("/api/users").send(user).expect(201);
    const userToken = await api.post("/api/login").send({
      username: user.username,
      password: user.password,
    });
    expect(userToken.body.token).toBeDefined();
  });

  test("no password tries to signup", async () => {
    const user = {
      username: "xdxdxdxdxd",
      name: "kokok",
    };
    await api.post("/api/users").send(user).expect(400);
  });

  test("no username tries to signup", async () => {
    const user = {
      name: "kokok",
      password: "asdasdasd",
    };
    await api.post("/api/users").send(user).expect(400);
  });

  test("same user tries to signup", async () => {
    const oldUser = {
      username: "xdxdxdxdxd",
      name: "kokok",
      password: "asdasdasd",
    };
    await api.post("/api/users").send(oldUser).expect(201);
    const newUser = {
      username: "xdxdxdxdxd",
      name: "kokok",
      password: "xdaadasdqwe",
    };

    await api.post("/api/users").send(newUser).expect(400);
  });

  test("3 character password tries to signup", async () => {
    const user = {
      username: "xdddd",
      name: "kokok",
      password: "hoh",
    };

    await api.post("/api/users").send(user).expect(400);
  });

  test("3 character username tries to signup", async () => {
    const user = {
      username: "xdd",
      name: "kokok",
      password: "hohoho",
    };

    await api.post("/api/users").send(user).expect(400);
  });

  test("create with a new username", async () => {
    const usersAtStart = await helper.usersInDb();
    const user = {
      username: "heyoo",
      name: "kokok",
      password: "hohoho",
    };

    await api
      .post("/api/users")
      .send(user)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(user.username);
  });

  test("get all users", async () => {
    const usersReal = await helper.usersInDb();
    const usersGot = await api.get("/api/users").expect(200);
    expect(usersGot.body).toHaveLength(usersReal.length);
  });
});

afterAll(async (done) => {
  mongoose.connection.close();
  done();
});
