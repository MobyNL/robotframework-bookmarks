/*
 * Canonical set of default categories/links for the RF Links bookmarklet.
 * Shape: [ [categoryName, [ [label, url], ... ]], ... ]
 *
 * This is the single source of truth. `scripts/build.js` reads it to
 * regenerate dist/default.bookmarklet.js and the README code block.
 * The builder UI (builder/index.html) reads it directly via <script src>
 * to seed its preset checkboxes.
 */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.RF_BOOKMARKS_DEFAULT = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  var RL = 'https://robotframework.org/robotframework/latest/libraries/';

  return [
    ['User Guide & Home', [
      ['RF User Guide', 'https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html'],
      ['robotframework.org', 'https://robotframework.org/'],
      ['Docs & libraries index', 'https://robotframework.org/robotframework/'],
      ['GitHub · robotframework', 'https://github.com/robotframework/robotframework']
    ]],
    ['Community Resources', [
      ['Awesome Robot Framework', 'https://github.com/MarketSquare/awesome-robotframework']
    ]],
    ['Standard Libraries', [
      ['BuiltIn', RL + 'BuiltIn.html'],
      ['Collections', RL + 'Collections.html'],
      ['DateTime', RL + 'DateTime.html'],
      ['Dialogs', RL + 'Dialogs.html'],
      ['OperatingSystem', RL + 'OperatingSystem.html'],
      ['Process', RL + 'Process.html'],
      ['Screenshot', RL + 'Screenshot.html'],
      ['String', RL + 'String.html'],
      ['Telnet', RL + 'Telnet.html'],
      ['XML', RL + 'XML.html']
    ]],
    ['External Libraries', [
      ['SeleniumLibrary', 'https://marketsquare.github.io/SeleniumLibrary/SeleniumLibrary.html'],
      ['Browser (Playwright)', 'https://marketsquare.github.io/robotframework-browser/Browser.html'],
      ['RequestsLibrary', 'https://marketsquare.github.io/robotframework-requests/doc/RequestsLibrary.html'],
      ['AppiumLibrary', 'http://serhatbolsu.github.io/robotframework-appiumlibrary/AppiumLibrary.html'],
      ['DatabaseLibrary', 'https://marketsquare.github.io/Robotframework-Database-Library/'],
      ['SSHLibrary', 'https://marketsquare.github.io/SSHLibrary/SSHLibrary.html']
    ]],
    ['Tooling', [
      ['Robot Framework Dashboard', 'https://github.com/MarketSquare/robotframework-dashboard'],
      ['Robocop (linter)', 'https://robocop.readthedocs.io/'],
      ['RobotCode (IDE support)', 'https://robotcode.io/'],
      ['Pabot (parallel)', 'https://pabot.org/'],
      ['RIDE (editor)', 'https://github.com/robotframework/RIDE']
    ]]
  ];
});
