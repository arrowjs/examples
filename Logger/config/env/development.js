'use strict';

module.exports = {
    db: {
        host: 'localhost',
        port: '5432',
        database: 'db_name',
        username: 'db_username',
        password: 'db_password',
        dialect: 'db_type',
        logging: false
    },
    redis: {
        host: 'localhost',
        port: '6379',
        type: 'fakeredis'
    },
    facebook: {
        clientID: process.env.FACEBOOK_ID || 'APP_ID',
        clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
        callbackURL: '/auth/facebook/callback'
    },
    twitter: {
        clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
        clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
        callbackURL: '/auth/twitter/callback'
    },
    google: {
        clientID: process.env.GOOGLE_ID || 'CONSUMER_KEY',
        clientSecret: process.env.GOOGLE_SECRET || 'CONSUMER_SECRET',
        callbackURL: 'http://techmaster.vn/auth/google/callback'
    },
    linkedin: {
        clientID: process.env.LINKEDIN_ID || 'APP_ID',
        clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
        callbackURL: '/auth/linkedin/callback'
    },
    github: {
        clientID: process.env.GITHUB_ID || 'APP_ID',
        clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
        callbackURL: '/auth/github/callback'
    },
    mailer: {
        from: process.env.MAILER_FROM || 'MAILER_FROM',
        options: {
            service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
            auth: {
                user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
                pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
            }
        }
    }
};
