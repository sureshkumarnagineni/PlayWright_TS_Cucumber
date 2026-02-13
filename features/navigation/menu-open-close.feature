Feature: Open and close hamburger menu

  Scenario: Open and close hamburger menu
    Given User launches the application
    When User logins as "standard_user"
    And User clicks hamburger menu
    Then User verifies menu is opened
    When User clicks close menu button
    Then User verifies menu is closed
