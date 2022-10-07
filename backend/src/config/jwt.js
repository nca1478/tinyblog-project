export default {
    secret: process.env.SESSION_SECRET || 's35510n_s3cret',
    expirationUser: { expiresIn: 60 * 60 * 24 * 1 }, // 1 days
    expirationRecoverPass: { expiresIn: 60 * 60 * 24 * 1 }, // 1 days
}
