const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.blogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("something", () => {
  test("all blogs are returned as json", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.blogs.length);
  });

  test("id must be defined for every item", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });

  test("new item can added to", async () => {
    const newBlog = new Blog({
      title: "Neler oluyor neler",
      author: "Ahmet Mehmet",
      url: "cokgizlibirurlbidiribibd",
      likes: 102,
    });

    const user = {
      username: "xdasxdasdxdxdxd",
      name: "kokok",
      password: "asdaassdasdasd",
    };
    await api.post("/api/users").send(user).expect(201);

    const userToken = await api.post("/api/login").send({
      username: user.username,
      password: user.password,
    });

    await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + userToken.body.token)
      .send(newBlog);
    const blogsNew = await helper.blogsInDb();
    expect(blogsNew).toHaveLength(helper.blogs.length + 1);
    const authors = blogsNew.map((blog) => blog.author);
    expect(authors).toContain("Ahmet Mehmet");
  });

  test("if no like specified, 0 likes created", async () => {
    const newBlog = new Blog({
      title: "nelerlerelre",
      author: "burasicokonemli",
      url: "huehuehuehueuhe",
    });

    const user = {
      username: "xasdxdxdxd",
      name: "kokok",
      password: "adasdasd",
    };
    await api.post("/api/users").send(user).expect(201);

    const userToken = await api.post("/api/login").send({
      username: user.username,
      password: user.password,
    });

    const response = await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + userToken.body.token)
      .send(newBlog);
    expect(response.body.likes).toBeDefined();
    expect(response.body.likes).toEqual(0);
  });

  test("url must be present", async () => {
    const newBlog = new Blog({
      author: "burasicokonemli",
      title: "huehuehuehueuhe",
    });

    const user = {
      username: "qxdxdasdxdxdxd",
      name: "kokok",
      password: "qasdasdasdasd",
    };
    await api.post("/api/users").send(user).expect(201);

    const userToken = await api.post("/api/login").send({
      username: user.username,
      password: user.password,
    });
    await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + userToken.body.token)
      .send(newBlog)
      .expect(400);
  });

  test("title must be present", async () => {
    const newBlog = new Blog({
      author: "burasicokonemli",
      url: "huehuehuehueuhe",
    });

    const user = {
      username: "xdxdasssqdxdxdxd",
      name: "kokok",
      password: "asdasdasaadasd",
    };
    await api.post("/api/users").send(user).expect(201);

    const userToken = await api.post("/api/login").send({
      username: user.username,
      password: user.password,
    });
    await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + userToken.body.token)
      .send(newBlog)
      .expect(400);
  });

  test("update a single item", async () => {
    const newBlog = new Blog({
      title: "nelerlerelre",
      author: "burasicokonemli",
      url: "huehuehuehueuhe",
    });

    const user = {
      username: "xdxdxfdxdxd",
      name: "kokok",
      password: "asdasfdasd",
    };
    await api.post("/api/users").send(user).expect(201);

    const userToken = await api.post("/api/login").send({
      username: user.username,
      password: user.password,
    });

    const resBlog = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", "bearer " + userToken.body.token);
    resBlog.body.likes = 20;

    finalBlog = await api
      .put(`/api/blogs/${resBlog.body.id}`)
      .send(resBlog.body)
      .set("Authorization", "bearer " + userToken.body.token);
    expect(resBlog.body.likes).toEqual(finalBlog.body.likes);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
