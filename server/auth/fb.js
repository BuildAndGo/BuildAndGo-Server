const passport = require('passport')
const router = require('express').Router()
const FBStrategy = require('passport-facebook')
const {User} = require('../db/models')
module.exports = router

process.env.FB_CALLBACK = ''


if (!process.env.FB_CLIENT_ID || !process.env.FB_CLIENT_SECRET) {

  console.log('Google client ID / secret not found. Skipping Google OAuth.')

} else {

  const googleConfig = {
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: process.env.FB_CALLBACK
  }

  const strategy = new FBStrategy(googleConfig, (token, refreshToken, profile, done) => {
    const fbId = profile.id
    const name = profile.displayName
    const email = profile.emails[0].value

    User.find({where: {fbId}})
      .then(foundUser => (foundUser
        ? done(null, foundUser)
        : User.create({name, email, fbId})
          .then(createdUser => done(null, createdUser))
      ))
      .catch(done)
  })

  passport.use(strategy)

  router.get('/', passport.authenticate('facebook', {scope: 'email'}))

  router.get('/callback', passport.authenticate('facebook', {
    successRedirect: '/home',
    failureRedirect: '/login'
  }))

}
