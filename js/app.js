var firebaseConfig = {
  apiKey: "AIzaSyDSdhny1Hh7xBShHXKPhHGT4TzbVhIKXz4",
  authDomain: "code-practice-20d1f.firebaseapp.com",
  databaseURL: "https://code-practice-20d1f-default-rtdb.firebaseio.com",
  projectId: "code-practice-20d1f",
  storageBucket: "code-practice-20d1f.appspot.com",
  messagingSenderId: "597732026547",
  appId: "1:597732026547:web:a2449919ae0399c19aa8c6",
  measurementId: "G-FE1K5LDBDE",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var provider = new firebase.auth.GoogleAuthProvider();
function logInGoogle() {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      //logged in
    })
    .catch(function (error) {
      console.log(error);
    });
  return false;
}
function logOutGoogle() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      //logged out
    })
    .catch(function (error) {
      console.log(error);
    });
  return false;
}
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    if (window.localStorage.getItem("hasAccount") == null) {
      addUserIfNew(user);
    }
    window.localStorage.setItem("expectedLoggedIn", true);
    $("#login").hide();
    $("#profile").show();
    $("#logout").show();
    $(".nav.visible").height("250px");
    $("#nav").addClass("logged-in");
  } else {
    window.localStorage.removeItem("expectedLoggedIn");
    $("#profile").hide();
    $("#logout").hide();
    $("#login").show();
    $("#nav").removeClass("logged-in");
  }
});

function addUserIfNew(user) {
  var ref = firebase.database().ref("users/" + user.uid);
  ref.once("value", (snapshot) => {
    const data = snapshot.val();
    if (data == null) {
      addUserDefault(user);
    }
  });
}

function addUserDefault(user) {
  var ref = firebase.database().ref("users/" + user.uid);
  var user_name = user.displayName;
  ref.set({
    name: user_name,
  });
  var date_joined = new Date(user.metadata.creationTime);
  var date_joined_ref = ref.child("joined");
  date_joined_ref.set({
    date: date_joined.toLocaleDateString(),
  });
  var photo_url = user.photoURL;
  var photo_url_ref = ref.child("photo");
  photo_url_ref.set({
    url: photo_url,
  });
  var uid_val = user.uid;
  var id_ref = ref.child("id");
  id_ref.set({
    uid: uid_val,
  });
  var num_solved_ref = ref.child("numSolved");
  num_solved_ref.set({
    count: 0,
  });
}
