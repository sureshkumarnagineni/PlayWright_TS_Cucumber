Feature: Verify product inventory status

  Scenario: Verify product availability and inventory status
    Given User launches the application
    When User logins as "standard_user"
    And User navigates to inventory
    When User checks product availability
    Then User verifies all products have inventory status
