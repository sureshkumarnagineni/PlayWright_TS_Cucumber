Feature: Verify empty cart message

  Scenario: Verify empty cart message
    Given User launches the application
    When User logins as "standard_user"
    And User opens cart without adding products
    Then User verifies cart is empty
