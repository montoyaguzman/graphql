const express = require("express");
const app = express();
const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");
const { courses } = require("./data.json");

const schema = buildSchema(` 
  type Query {
    getCourseById(id: Int!): Course
    getJavascriptCourses(topic: String!): [Course] 
  }

  type Course {
    id: Int
    title: String
    description: String
    author: String
    topic: String
    url: String
  }
`);

let getCourseById = args => {
  let id = args.id;
  return courses.filter(course => {
    if (course.id == id) {
      return course;
    }
  })[0];
};

let getJavascriptCourses = args => {
  if (args.topic) {
    return courses.filter(course => course.topic === args.topic);
  } else {
    return courses;
  }
};

const root = {
  getCourseById: getCourseById,
  getJavascriptCourses: getJavascriptCourses
};

app.use(
  "/graphql",
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(3001, () => console.log("Server init on port 3001..."));
