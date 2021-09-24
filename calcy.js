$(document).ready(function() {

  var string = "";

  /* Calculator input string */
  $(".value").mousedown(function() {
    string += $(this).text();
    $("#calc").text(string);
  });
  /* Clear all */
  $(".C").click(function() {
    string = "";
    $("#calc, #result").text("0");
  });
  /* Clear last entry */
  $(".CE").click(function() {
    string = string.slice(0, string.length - 1);
    $("#calc").text(string);
  });

  /* Show result */
  $(".equals").click(function() {
    $("#result").text(eval(string));
  });

  /* Enabling keyboard input */

  $(document).keydown(function(event) {

    /* Numbers 0 - 9 */
    if (event.which == 48) {
      string += 0;
      $("#calc").text(string);
    }
    if (event.which == 49) {
      string += 1;
      $("#calc").text(string);
    }
    if (event.which == 50) {
      string += 2;
      $("#calc").text(string);
    }
    if (event.which == 51) {
      string += 3;
      $("#calc").text(string);
    }
    if (event.which == 52) {
      string += 4;
      $("#calc").text(string);
    }
    if (event.which == 53) {
      string += 5;
      $("#calc").text(string);
    }
    if (event.which == 54) {
      string += 6;
      $("#calc").text(string);
    }
    if (event.which == 55) {
      string += 7;
      $("#calc").text(string);
    }
    if (event.which == 56 && !event.shiftKey)     {
    string += 8;
    $("#calc").text(string);
    }
    if (event.which == 57) {
      string += 9;
      $("#calc").text(string);
    }
    /* Show result with enter */
    if (event.which == 13) {
      $("#result").text(eval(string));
    }
    /* Backspace remove last entry */
    if (event.which == 8) {
      string = string.slice(0, string.length - 1);
      $("#calc").text(string);
    }
    /* Clear all with escape */
    if (event.which == 27) {
      string = "";
      $("#calc, #result").text("0");
    }

  });

  $(document).keypress(function(event) {
    /* Start of operators */
    if (event.which == 43) {
      string += '+';
      $("#calc").text(string);
    }
    if (event.which == 45) {
      string += "-";
      $("#calc").text(string);
    }
    if (event.which == 42) {
      string += "*";
      $("#calc").text(string);
    }
    if (event.which == 47) {
      string += "/";
      $("#calc").text(string);
    }
    if (event.which == 46) {
      string += ".";
      $("#calc").text(string);
    }
  });

});