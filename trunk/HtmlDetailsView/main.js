// Copyright (c) 2006 Google Inc.
// All rights reserved
// 
// This file is part of the Google Desktop SDK and may be freely copied and used.
// To download the latest version of the SDK please visit 
// http://desktop.google.com/

var DEFAULT_HTML_STYLE = "<html>" +
  // Set the style (fonts, sizes, etc)
  "<style type=\"text/css\">" +
  "<!--" +
  "body,td,th {" +
  "	 font-family: Geneva, Arial, Helvetica, sans-serif;" +
  "	 font-size: 12px;" +
  "	 color: #333333;" +
  "}" +
  "body {" +
  "	 margin-left: 0px;" +
  "	 margin-top: 0px;" +
  "	 margin-right: 0px;" +
  "	 margin-bottom: 0px;" +

  // Remove scrollbar from side
  "  overflow: auto;" +
  "}" +
  "-->" +
  "</style>" +

  // Disable right click
  "<script language=\"Javascript\">" +
  "  document.oncontextmenu=new Function(\"return false\")" +
  "</script>";
var DETAILS_HTML = DEFAULT_HTML_STYLE +
  "<body>" +
  CLICK_AN_ITEM + "<p>" +
  "<a href=\"\" onclick=\"window.external.onItemClick('A'); return false;\">" 
  + ITEM_A + "</a><br>" +
  "<a href=\"\" onclick=\"window.external.onItemClick('B'); return false;\">" 
  + ITEM_B + "</a><br>" +
  "<a href=\"\" onclick=\"window.external.onItemClick('C'); return false;\">" 
  + ITEM_C + "</a><br>" +
  "</p></body>" +
  "</html>";

function onTextClick() {
  // Create the details view and set its content. Specifying 'undefined' in 
  // setContent makes it such that no time is displayed in the details view
  var htmlDetailsView = new DetailsView();
  htmlDetailsView.html_content = true;
  htmlDetailsView.setContent("", undefined, DETAILS_HTML, false, 0);

  // In order to have two way communication with the HTML details view, we 
  // need to set an external object that can receive events. This is called 
  // from the HTML using the javascript "window.external.onItemClick(text);".
  var externalObject = new Object();
  externalObject.onItemClick = onItemClick;
  htmlDetailsView.external = externalObject;

  // Show the details view
  pluginHelper.showDetailsView(htmlDetailsView, DETAILS_VIEW_TITLE, 
    gddDetailsViewFlagToolbarOpen, onDetailsViewFeedback);
}

function onItemClick(text) {
  // Display which item was clicked on
  view.alert(text);

  // Close the details view
  pluginHelper.CloseDetailsView();
}

function onDetailsViewFeedback(detailsViewFlags) {
  if (detailsViewFlags == gddDetailsViewFlagNone) {
    // User closed the details view
  } else if (detailsViewFlags == gddDetailsViewFlagToolbarOpen) {
    // User clicked on the title of the details view
  }
}