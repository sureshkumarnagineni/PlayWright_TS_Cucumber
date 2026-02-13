Feature: Login with invalid password

  Scenario: Login fails with invalid password
    Given User launches the application
    When User enters valid username and invalid password
    Then User verifies login error message "Epic sadface: Username and password do not match any user in this service"
