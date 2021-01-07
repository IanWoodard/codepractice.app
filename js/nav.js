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
  if (window.localStorage.getItem("cookie-consent") == undefined) {
    $("body").append(
      "<div id='cookie-consent' class='cookie-consent'><span class='cookie-message'>By using our site you agree to our <a href='https://www.codepractice.io/cookie' class='cookie-link'>cookie policy</a>.</span><div class='cookie-button-cont'><svg width='16' height='16' class='cookie-button' id='cookie-accept' viewBox='0 0 122.88 122.88'><style xmlns='http://www.w3.org/2000/svg' type='text/css'>.st0{fill-rule:evenodd;clip-rule:evenodd;}</style>" +
        "<path xmlns='http://www.w3.org/2000/svg' class='st0' d='M1.63,97.99l36.55-36.55L1.63,24.89c-2.17-2.17-2.17-5.73,0-7.9L16.99,1.63c2.17-2.17,5.73-2.17,7.9,0 l36.55,36.55L97.99,1.63c2.17-2.17,5.73-2.17,7.9,0l15.36,15.36c2.17,2.17,2.17,5.73,0,7.9L84.7,61.44l36.55,36.55 c2.17,2.17,2.17,5.73,0,7.9l-15.36,15.36c-2.17,2.17-5.73,2.17-7.9,0L61.44,84.7l-36.55,36.55c-2.17,2.17-5.73,2.17-7.9,0 L1.63,105.89C-0.54,103.72-0.54,100.16,1.63,97.99L1.63,97.99z'/></svg></div></div>"
    );
  }
  $("#cookie-accept").click(function () {
    window.localStorage.setItem("cookie-cosent", "yes");
    $("#cookie-consent").hide();
  });
});
