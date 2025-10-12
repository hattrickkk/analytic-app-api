export const ROLES = [
  { name: 'admin', code: 'ADMIN' },
  { name: 'teacher', code: 'TEACHER' },
];

export const USERS = [
  {
    email: 'admin@example.com',
    username: 'admin',
    password: '$2b$10$q/BMm9lTENSkfNJ7PV6lFOdMynsVh5hSzd7FTSkIEeINqzLGooTIS', //password123
    roleId: 1,
  },
  {
    email: 'teacher@example.com',
    username: 'teacher1',
    password: 'password456',
    roleId: 2,
  },
];
