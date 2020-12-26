$("#bookmark").click(function () {
  var cur_user = firebase.auth().currentUser;
  var cur_path = window.location.pathname;
  var cur_problem = cur_path.substring(1, cur_path.indexOf("."));
  if (cur_user) {
    if ($("#bookmark").attr("src") == "svg/bookmark.svg") {
      $("#bookmark").attr("src", "svg/bookmarked.svg");
      firebase
        .database()
        .ref("users/" + cur_user.uid + "/bookmarks/" + cur_problem)
        .set({ bookmarked: true });
    } else {
      $("#bookmark").attr("src", "svg/bookmark.svg");
      firebase
        .database()
        .ref("users/" + cur_user.uid + "/bookmarks")
        .child(cur_problem)
        .remove();
    }
  }
});
firebase.auth().onAuthStateChanged(function (user) {
  var path = window.location.pathname;
  var problem = path.substring(1, path.indexOf("."));
  if (user) {
    if (window.localStorage.getItem(problem + "-bookmark") != undefined) {
      $("#bookmark").attr("src", "svg/bookmarked.svg");
    }
    firebase
      .database()
      .ref("users/" + user.uid + "/bookmarks/" + problem)
      .once("value", (snapshot) => {
        if (snapshot.val() != null) {
          window.localStorage.setItem(problem + "-bookmark");
          if ($("#bookmark").attr("src") == "svg/bookmark.svg") {
            $("#bookmark").attr("src", "svg/bookmarked.svg");
          }
        } else {
          window.localStorage.removeItem(problem + "-bookmark");
          if ($("#bookmark").attr("src") != "svg/bookmark.svg") {
            $("#bookmark").attr("src", "svg/bookmark.svg");
          }
        }
      });
  }
});
