import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Moaz",
    email: "moaz@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Mohamed",
    email: "mohamed@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
