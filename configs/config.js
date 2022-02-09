module.exports={
    PORT: process.env.PORT || 5000,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'secret_access',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'secret_refresh',
}