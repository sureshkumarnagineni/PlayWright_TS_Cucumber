Feature: Verify cart item details

  Scenario: Verify cart item details
    Given User launches the application
    When User logins as "standard_user"
    And User adds specific product "Sauce Labs Backpack" to cart
    And User opens cart
    Then User verifies cart item name is "Sauce Labs Backpack"
    And User verifies cart item quantity is "1"
    And User verifies cart item price is displayed
