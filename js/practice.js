$("#show-more").click(function () {
  $("#show-more").hide();
  $("#documentation").addClass("expanded");
  $("#show-less").show();
});
$("#show-less").click(function () {
  $("#show-less").hide();
  $("#documentation").removeClass("expanded");
  $("#show-more").show();
});
$("#bookmark").click(function () {
  var user = firebase.auth().currentUser;
  var path = window.location.pathname;
  var problem = path.substring(1, path.indexOf("."));
  if (user) {
    if ($("#bookmark").attr("src") == "svg/bookmark.svg") {
      $("#bookmark").attr("src", "svg/bookmarked.svg");
      firebase
        .database()
        .ref("users/" + user.uid + "/bookmarks/" + problem)
        .set({ bookmarked: true });
    } else {
      $("#bookmark").attr("src", "svg/bookmark.svg");
      firebase
        .database()
        .ref("users/" + user.uid + "/bookmarks")
        .child(problem)
        .remove();
    }
  }
});
$(document).ready(function () {
  var user = firebase.auth().currentUser;
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
