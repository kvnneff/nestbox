const Auth0 = require('auth0-js')
const arrayify = require('arrayify')
const classes = require('component-classes')

const auth0 = new Auth0({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  callbackURL: process.env.AUTH0_CALLBACK_URL
})

const registerForm = document.querySelector('.register-form')

const submitForm = (email) => {
  auth0.requestMagicLink({
    email
  }, (err) => {
    if (err) {
      console.error(err.error_description)
      return
    }
    const els = registerForm.elements
    arrayify(els).forEach((element) => {
      element.disabled = true
    })

    classes(registerForm).add('dn')

    const div = document.createElement('div')
    classes(div)
      .add('pa3')
      .add('bg-washed-green')
      .add('ba')
      .add('b--dark-green')
      .add('dark-green')
    div.innerHTML = '<p class="lh-copy measure">Thank you for registering!  An email has been sent to your address with a link that will allow you to sign in.'
    document.querySelector('.register-success').appendChild(div)
  })
}


registerForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const email = event.target.querySelector('#email').value
  submitForm(email)
})
