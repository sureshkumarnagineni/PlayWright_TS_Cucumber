Feature: Login with invalid username

  Scenario: Login fails with invalid username
    Given User launches the application
    When User enters invalid username and valid password
    Then User verifies login error message "Epic sadface: Username and password do not match any user in this service"
