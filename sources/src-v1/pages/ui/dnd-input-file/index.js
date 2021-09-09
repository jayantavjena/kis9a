require("https://code.jquery.com/jquery-3.2.1.min.js");

var $fileInput = $(".file-input");
var $droparea = $(".file-drop-area");

// highlight drag area
$fileInput.on("dragenter focus click", () => {
  $droparea.addClass("is-active");
});

// back to normal state
$fileInput.on("dragleave blur drop", () => {
  $droparea.removeClass("is-active");
});

// change inner text
$fileInput.on("change", function () {
  console.log($(this));
  let filesCount = $(this)[0].files.length;
  let $textContainer = $(this).prev();

  if (filesCount === 1) {
    // if single file is selected, show file name
    let fileName = $(this).val().split("\\").pop();
    $textContainer.text(fileName);
  } else {
    // otherwise show number of files
    $textContainer.text(`${filesCount} files selected`);
  }
});
