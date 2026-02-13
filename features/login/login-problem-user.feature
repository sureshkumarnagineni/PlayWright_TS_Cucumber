Feature: Login with problem user

  Scenario: Successfully login with problem user
    Given User launches the application
    When User logins as "problem_user"
    Then User verifies successful login
