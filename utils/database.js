import { openDatabase } from 'expo-sqlite';

// Open or create the database
const db = openDatabase('myapp.db');

// Initialize the database
export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Create a sample table (you can modify this based on your needs)
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,
        [],
        () => {
          console.log('Database initialized');
          resolve();
        },
        (_, error) => {
          console.error('Error initializing database:', error);
          reject(error);
        }
      );
    });
  });
};

// Add a new item
export const addItem = (title, description) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO items (title, description) VALUES (?, ?)',
        [title, description],
        (_, result) => {
          resolve(result.insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

// Get all items
export const getItems = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM items ORDER BY created_at DESC',
        [],
        (_, { rows: { _array } }) => {
          resolve(_array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

// Update an item
export const updateItem = (id, title, description) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE items SET title = ?, description = ? WHERE id = ?',
        [title, description, id],
        (_, result) => {
          resolve(result.rowsAffected);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

// Delete an item
export const deleteItem = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM items WHERE id = ?',
        [id],
        (_, result) => {
          resolve(result.rowsAffected);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}; 