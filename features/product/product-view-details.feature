Feature: View product details

  Scenario: View individual product details
    Given User launches the application
    When User logins as "standard_user"
    And User clicks on first product
    Then User verifies product details page is displayed
    And User verifies product name is visible
    And User verifies product description is visible
    And User verifies product price is visible
