Feature: Login with standard user

  Scenario: Successfully login with valid standard user credentials
    Given User launches the application
    When User logins as "standard_user"
    Then User verifies successful login
