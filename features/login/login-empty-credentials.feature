Feature: Login with empty credentials

  Scenario: Login fails with empty credentials
    Given User launches the application
    When User clicks login button without entering credentials
    Then User verifies login error message "Epic sadface: Username is required"
