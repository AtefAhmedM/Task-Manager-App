const express = require('express');
const dotenv = require('dotenv'); 
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

app.use(express.json());

const sqlite3 = require('sqlite3').verbose();

// Set up Global configuration access 
dotenv.config(); 
  
let PORT = process.env.PORT || 3000; 
app.listen(PORT, () => { 
  console.log(`Server is up and running on ${PORT} ...`); 
}); 
  
// Main Code Here  // 
// Generating JWT 
app.post("/user/generateToken", (req, res) => {
  // Generate JWT Token
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    userId: 12,
  };

  const token = jwt.sign(data, jwtSecretKey);

  // Send the token in the response body
  res.json({ token });
});
  
// Verification of JWT 
app.get("/user/validateToken", (req, res) => { 
    // Tokens are generally passed in header of request 
    // Due to security reasons. 
  
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY; 
    let jwtSecretKey = process.env.JWT_SECRET_KEY; 
  
    try { 
        const token = req.header(tokenHeaderKey); 
  
        const verified = jwt.verify(token, jwtSecretKey); 
        if(verified){ 
            return res.send("Successfully Verified"); 
        }else{ 
            // Access Denied 
            return res.status(401).send(error); 
        } 
    } catch (error) { 
        // Access Denied 
        return res.status(401).send(error); 
    } 
});

// Create and connect to the database
const db = new sqlite3.Database('./user_info.db', (err) => {
  if (err) {
    console.error(err.message);
    process.exit(1); // Terminate the app if there's an error connecting to the database
  } else {
    console.log('Connected to the user_info database.');
  }
});

// Define database schema and tables
const initDB = () => {
  const schema = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
  );
  
  -- Tasks Table
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    due_date DATE,
    user_id INTEGER,
    category_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (category_id) REFERENCES categories (id)
  );
  
  -- Categories Table
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
  );
  `;

  try {
    db.exec(schema);
    console.log('Database schema initialized successfully.');
  } catch (error) {
    console.error('Database schema initialization error:', error.message);
    process.exit(1); // Terminate the app in case of a schema initialization error
  }
};

initDB(); // Call to initialize the database schema

// User Registration
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;

  // Validate username and password
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Further validation (e.g., minimum length, pattern)
  if (username.length < 5 || password.length < 8) {
    return res.status(400).json({ message: 'Username and password must meet certain criteria' });
  }

  // Sanitize inputs to prevent SQL injection
  const usernameSafe = sqlstring.escape(username);
  const passwordSafe = sqlstring.escape(password);

  try {
    // Check if the username is already in use
    db.get('SELECT id FROM users WHERE username = ?', [usernameSafe], (err, user) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'User registration failed' });
      }

      if (user) {
        return res.status(409).json({ message: 'Username already in use' });
      }

      // Create a new user
      db.run('INSERT INTO users (username, password) VALUES (?, ?)', [usernameSafe, passwordSafe], (err) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ message: 'User registration failed' });
        }
        res.json({ message: 'User registered successfully' });
      });
    });
  } catch (error) {
    console.error('User registration error:', error.message);
    res.status(500).json({ message: 'User registration failed' });
  }
});

// User Profile Management
app.put('/api/profile', (req, res) => {
  const { username, currentPassword, newPassword, updatedDetails } = req.body;

  // Validate if a user is authenticated and provided current password
  const token = req.header(process.env.TOKEN_HEADER_KEY);
  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  // Verify the authentication token
  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Authentication token is invalid' });
      }
      // Check if the user's ID matches the authenticated user's ID
      if (decoded.userId !== 12) {
        return res.status(403).json({ message: 'Access denied. Invalid user ID.' });
      }

      // Continue with profile management
      // If user wants to change the password, verify the current password
      if (newPassword) {
        if (!currentPassword) {
          return res.status(400).json({ message: 'Current password is required to change the password' });
        }

        // Verify the current password
        db.get('SELECT id FROM users WHERE username = ? AND password = ?', [username, currentPassword], (err, user) => {
          if (err) {
            console.error(err.message);
            return res.status(500).json({ message: 'Password change failed' });
          }

          if (!user) {
            return res.status(401).json({ message: 'Current password is incorrect' });
          }

          // Update the password
          db.run('UPDATE users SET password = ? WHERE username = ?', [newPassword, username], (err) => {
            if (err) {
              console.error(err.message);
              return res.status(500).json({ message: 'Password change failed' });
            }
            res.json({ message: 'Password changed successfully' });
          });
        });
      }

      // If user wants to update personal details
      if (updatedDetails) {
        const { newUsername, newEmail } = updatedDetails;

        // Ensure that either newUsername or newEmail is provided to update details
        if (!newUsername && !newEmail) {
          return res.status(400).json({ message: 'At least one of newUsername or newEmail is required for profile update' });
        }
      
        // Build the SQL query based on which fields need to be updated
        const updateFields = [];
        const params = [decoded.userId]; // Include the user ID as a parameter
        if (newUsername) {
          updateFields.push('username = ?');
          params.push(newUsername);
        }
        if (newEmail) {
          updateFields.push('email = ?');
          params.push(newEmail);
        }
      
        const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
      
        try {
          db.run(updateQuery, params, (err) => {
            if (err) {
              console.error(err.message);
              return res.status(500).json({ message: 'Profile update failed' });
            }
            res.json({ message: 'Profile updated successfully' });
          });
        } catch (error) {
          console.error('Profile management error:', error.message);
          res.status(500).json({ message: 'Profile management failed' });
        }
      }
    });
  } catch (error) {
    console.error('Profile management error:', error.message);
    res.status(500).json({ message: 'Profile management failed' });
  }
});


// User Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Validate username and password
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Authenticate user
    db.get('SELECT id FROM users WHERE username = ? AND password = ?', [username, password], (err, user) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Authentication failed' });
      }

      if (user) {
        res.json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Authentication failed' });
      }
    });
  } catch (error) {
    console.error('User login error:', error.message);
    res.status(500).json({ message: 'Authentication failed' });
  }
});

// CRUD Operations for Tasks
app.get('/api/tasks', (req, res) => {
  const { page, limit, category, search, sortBy, sortOrder } = req.query;

  // Pagination settings (set default values if not provided)
  const pageNumber = parseInt(page) || 1;
  const itemsPerPage = parseInt(limit) || 10;
  const offset = (pageNumber - 1) * itemsPerPage;

  // SQL query components
  const selectQuery = 'SELECT * FROM tasks';
  const whereConditions = [];
  const params = [];

  // Apply filters if provided
  if (category) {
    whereConditions.push('category_id = ?');
    params.push(category);
  }
  if (search) {
    whereConditions.push('title LIKE ?');
    params.push(`%${search}%`);
  }

  // Construct the WHERE clause if filters are provided
  let whereClause = '';
  if (whereConditions.length > 0) {
    whereClause = ' WHERE ' + whereConditions.join(' AND ');
  }

  // Sorting settings (default to sorting by task ID in ascending order if not provided)
  const validSortColumns = ['id', 'title', 'due_date', 'priority']; // Define valid sorting columns
  const sortColumn = validSortColumns.includes(sortBy) ? sortBy : 'id';
  const sortDirection = sortOrder === 'desc' ? 'DESC' : 'ASC';

  // Final SQL query with sorting
  const query = `${selectQuery}${whereClause} ORDER BY ${sortColumn} ${sortDirection} LIMIT ? OFFSET ?`;
  params.push(itemsPerPage, offset);

  try {
    db.all(query, params, (err, tasks) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Task retrieval failed' });
      }
      res.json({ tasks });
    });
  } catch (error) {
    console.error('Task retrieval error:', error.message);
    res.status(500).json({ message: 'Task retrieval failed' });
  }
});