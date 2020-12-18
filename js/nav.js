$(document).ready(function () {
  if (window.localStorage.getItem("expectedLoggedIn")) {
    $("#login").hide();
    $("#profile").show();
    $("#logout").show();
    $("#nav").addClass("logged-in");
  } else {
    $("#profile").hide();
    $("#logout").hide();
    $("#login").show();
    $("#nav").removeClass("logged-in");
  }
  $(".navbar-hamburger-menu").click(function () {
    $(".nav").toggleClass("visible");
    $(".nav-a").toggleClass("navbar-a");
    $("body").toggleClass("cover");
  });
  $(".nav-a").click(function () {
    if ($(".nav-a").hasClass("navbar-a")) {
      $(".nav").toggleClass("visible");
      $("body").toggleClass("cover");
      $(".nav-a").toggleClass("navbar-a");
    }
  });
});
