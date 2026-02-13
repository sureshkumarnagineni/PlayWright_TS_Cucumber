Feature: Verify default sorting

  Scenario: Verify default sorting
    Given User launches the application
    When User logins as "standard_user"
    Then User verifies default product sorting is active
