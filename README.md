# Project Details and Design Choices
Used an interface to implement handlers for each command along with an executeCommands. This allows implementation of User Story 6
along with the rest of the stories. I integrated the RegisterCommand command into the index.tsx file, which takes in the 
command to be run through the Mock command line and a function to execute when it is called in the command line. No other significant 
design changes were made, other than formatting mock CSV files as JSON Strings rather than as 2D arrays.

# Errors/Bugs
No known errors or bugs

# Tests
Wrote front end tests for every method, along with parameters tests for too few, too many, and valid inputs.
also tested on both verbose and brief modes. Checked the output with playwright, but did not write unit tests
because there were no methods to unit test 

# How to
No bugs to recreate. For running, cd into the mock directory, then run npm start. From there, run any commands
you'd like to test the functionality

# Collaboration
No collaborators. The links below were used:

Used this to learn await https://blog.logrocket.com/async-await-typescript/
Used to learn about HTML tables https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table
How to use ternary operator https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
How to reset focus on an element https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus

<!--
<type>([optional scope]): <description>
where <type> is the type of change:
feat: implementing a new feature
refactor
fix: changes that squash a bug
docs: documentation (README, comments, etc.)
chore: a quick change to the code that doesn’t affect any functionality, such as removing a TODO comment or a print statement
pair-prog w/ @cslogin: Made a pair programming effort to advance the project -->
