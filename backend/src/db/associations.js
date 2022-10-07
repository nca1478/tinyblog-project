// Main Models
import Post from '../services/posts/model'
import User from '../services/users/model'

// ----------------------- DB Relationships ---------------------------

// ---------------- hasMany (1:M) & belongsTo (1:1) -------------------

// User-Post / Post-User
User.hasMany(Post, { as: 'posts', foreignKey: 'userId' })
Post.belongsTo(User, { as: 'user', foreignKey: 'userId' })

// --------------------- belongsToMany (N:M) -------------------------
