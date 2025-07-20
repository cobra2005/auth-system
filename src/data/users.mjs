export const users = [
  // Admin users
  {
    id: "1",
    username: "superadmin",
    email: "superadmin@example.com",
    passwordHash: "$2a$10$XH8Q9zOLc5JfV7WkA5nB7eZ1Yd2vT0rK1lM2nN3b4c5d6e7f8g9h0i", // bcrypt hash for 'Admin@1234'
    role: "admin",
    createdAt: new Date("2023-01-15"),
    isActive: true
  },
  {
    id: "2",
    username: "sysadmin",
    email: "sysadmin@example.com",
    passwordHash: "$2a$10$YH8Q9zOLc5JfV7WkA5nB7eZ1Yd2vT0rK1lM2nN3b4c5d6e7f8g9h0i", // bcrypt hash for 'System@2023'
    role: "admin",
    createdAt: new Date("2023-02-20"),
    isActive: true
  },
  {
    id: "3",
    username: "webmaster",
    email: "webmaster@example.com",
    passwordHash: "$2a$10$ZH8Q9zOLc5JfV7WkA5nB7eZ1Yd2vT0rK1lM2nN3b4c5d6e7f8g9h0i", // bcrypt hash for 'Webmaster#1'
    role: "admin",
    createdAt: new Date("2023-03-10"),
    isActive: true
  },
  {
    id: "4",
    username: "dbadmin",
    email: "dbadmin@example.com",
    passwordHash: "$2a$10$WH8Q9zOLc5JfV7WkA5nB7eZ1Yd2vT0rK1lM2nN3b4c5d6e7f8g9h0i", // bcrypt hash for 'Database!2023'
    role: "admin",
    createdAt: new Date("2023-04-05"),
    isActive: true
  },
  {
    id: "5",
    username: "security",
    email: "security@example.com",
    passwordHash: "$2a$10$VH8Q9zOLc5JfV7WkA5nB7eZ1Yd2vT0rK1lM2nN3b4c5d6e7f8g9h0i", // bcrypt hash for 'SecurePass123'
    role: "admin",
    createdAt: new Date("2023-05-12"),
    isActive: true
  },

  // Regular users
  {
    id: "6",
    username: "john_doe",
    email: "john.doe@example.com",
    passwordHash: "$2a$10$AH8Q9zOLc5JfV7WkA5nB7eZ1Yd2vT0rK1lM2nN3b4c5d6e7f8g9h0i", // bcrypt hash for 'John@1234'
    role: "user",
    createdAt: new Date("2023-06-01"),
    isActive: true
  },
  {
    id: "7",
    username: "jane_smith",
    email: "jane.smith@example.com",
    passwordHash: "$2a$10$BH8Q9zOLc5JfV7WkA5nB7eZ1Yd2vT0rK1lM2nN3b4c5d6e7f8g9h0i", // bcrypt hash for 'JaneSmith2023'
    role: "user",
    createdAt: new Date("2023-06-15"),
    isActive: true
  },
  {
    id: "8",
    username: "mike_j",
    email: "mike.j@example.com",
    passwordHash: "$2a$10$CH8Q9zOLc5JfV7WkA5nB7eZ1Yd2vT0rK1lM2nN3b4c5d6e7f8g9h0i", // bcrypt hash for 'MikePassword'
    role: "user",
    createdAt: new Date("2023-07-01"),
    isActive: true
  },
  {
    id: "9",
    username: "sarah_k",
    email: "sarah.k@example.com",
    passwordHash: "$2a$10$DH8Q9zOLc5JfV7WkA5nB7eZ1Yd2vT0rK1lM2nN3b4c5d6e7f8g9h0i", // bcrypt hash for 'Sarah123!'
    role: "user",
    createdAt: new Date("2023-07-10"),
    isActive: true
  },
  {
    id: "10",
    username: "david_w",
    email: "david.w@example.com",
    passwordHash: "$2a$10$EH8Q9zOLc5JfV7WkA5nB7eZ1Yd2vT0rK1lM2nN3b4c5d6e7f8g9h0i", // bcrypt hash for 'DavidPass2023'
    role: "user",
    createdAt: new Date("2023-07-20"),
    isActive: true
  }
];