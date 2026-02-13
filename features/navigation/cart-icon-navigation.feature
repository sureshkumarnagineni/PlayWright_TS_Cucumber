Feature: Cart icon navigation

  Scenario: Verify cart icon navigation
    Given User launches the application
    When User logins as "standard_user"
    And User clicks cart icon
    Then User verifies cart page is displayed
