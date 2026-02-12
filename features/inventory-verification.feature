Feature: Inventory Status Verification

  Scenario: Verify product availability and inventory status
    Given User launches the application
    When User logins as "standard_user"
    And User navigates to inventory
    And User checks product availability
    Then User verifies all products have inventory status
