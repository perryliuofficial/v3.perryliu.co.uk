// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});

//date picker
$(document).ready(function() {
  $(".datepicker").datepicker({
    format: "yyyy/mm/dd"    
  });
});

// $(document).ready(function(){
//   $('.datepicker').datepicker();
// });

//Initial chips  
// $('.chips-initial').chips({
//   data: [{
//     tag: 'work',
//   }, {
//     tag: 'admin',
//   }, {
//     tag: 'mkt',
//   },{
//     tag: 'art',
//   },{
//     tag: 'web',
//   },{
//     tag: 'game',
//   },{
//     tag: 'hide',
//   }],
// });

const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
  if (user) {
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

db.collection('portfolio').get().then(snapshot => {
  // setupPortfolios(snapshot.docs);
});

// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    setupUI(user);
  } else {
    setupUI(user);
  }
})

//create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('portfolio').add({
    title: createForm.title.value,
    content_short: createForm['content_short'].value,
    content_long: createForm['content_long'].value,
    date_start: createForm['date_start'].value,
    date_end: createForm['date_end'].value,
    PNG: createForm['PNG'].value,
    WebP: createForm['WebP'].value,
    AVIF: createForm['AVIF'].value,
    tag1: createForm['tag1'].value,
    tag2: createForm['tag2'].value,
    tag3: createForm['tag3'].value,
    url1: createForm['url1'].value,
    link1: createForm['link1'].value,
    url2: createForm['url2'].value,
    link2: createForm['link2'].value,
    url3: createForm['url3'].value,
    link3: createForm['link3'].value,
    category: createForm['category'].value
  }).then(() => {
    // close the create modal & reset form
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(err => {
    console.log(err.message);
  });
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });

});