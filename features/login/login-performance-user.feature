Feature: Login with performance glitch user

  Scenario: Successfully login with performance glitch user
    Given User launches the application
    When User logins as "performance_glitch_user"
    Then User verifies successful login
