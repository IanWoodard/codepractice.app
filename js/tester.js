function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a.length !== b.length) return false;
  var alength = a.length;
  for (var i = 0; i < alength; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function runtests(ref, name) {
  var delay_per_test = 80;
  var delay = (ref.tests.length + 1) * delay_per_test;
  var transition_duration = delay + "ms";
  $("#progress-bar").addClass("remove-transitions");
  $("#progress-bar").removeClass("fill");
  setTimeout(function() {
    $("#progress-bar").removeClass("remove-transitions");
    $("#progress-bar").addClass("fill");
  }, delay_per_test);
  $("#progress-bar").css("transition-duration", transition_duration);
  $("#progress-wrap").show();
  $("#run-tests").prop("disabled", true);
  $("#tests").html("");
  var tests_passed = 0;
  var error = false;
  var error_msg = "";
  try {
    for (var i = 0; i < ref.tests.length; i++) {
      if (Array.isArray(ref.tests[i].ans)) {
        if (arraysEqual(new Function(ref.tests[i].func + editor.getValue())(), ref.tests[i].ans)) {
          tests_passed++;
        }
      } else if (new Function(ref.tests[i].func + editor.getValue())() == ref.tests[i].ans) {
        tests_passed++;
      }
    }
  } catch(err) {
    error = true;
    error_msg = err.message;
  }
  var tests_ran = 0;
  var intervalId = setInterval(updateTests, delay_per_test);
  function updateTests() {
    if (tests_ran < ref.tests.length) {
      document.getElementById("ran-tests").innerHTML = "" + (tests_ran + 1);
      tests_ran++;
    } else {
      clearInterval(intervalId);
    }
  }
  var user = firebase.auth().currentUser;
  setTimeout(function() {
    if (error) {
      $("#tests").html("<p class='failed'> An exception was thrown: " + error_msg + "</p>");
    } else if (tests_passed == ref.tests.length) {
      $("#tests").html("<p class='passed'>All tests passed</p>");
      if (user) {
        $("#tests").append("<p style='font-weight: 700; margin-bottom: 0px;'>Congrats!</p>");
        $("#tests").append("<a href='index.html' style='margin-top: 5px; text-decoration: none; color: black;'>Click here to select a new problem!</a>");
        addSolvedProblem(name.toString());
      } else {
        $("#tests").append("<p style='font-weight: 700; margin-bottom: 0px;'>Congrats!</p>");
        $("#tests").append("<p style='margin: 5px;'>Login to save your progress!</p>");
        $("#tests").append("<a href='index.html' style='margin-top: 5px; text-decoration: none; color: black;'>Click here to select a new problem!</a>");
      }
    } else {
      $("#tests").html("<p class='failed'>" + tests_passed + " out of " + ref.tests.length + " passed</p>");
    }
  }, delay);
  setTimeout(function() {
    $("#run-tests").prop("disabled", false);
  }, delay * 1.3);
}