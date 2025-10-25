const initUserTable = async (pg: Bun.SQL) => {
  await pg`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
};

const initTodosTable = async (pg: Bun.SQL) => {
  await pg`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id),
      title TEXT NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
};

export const initTables = async (pg: Bun.SQL) => {
  await initUserTable(pg);
  await initTodosTable(pg);
};
