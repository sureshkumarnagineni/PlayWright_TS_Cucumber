Feature: Add single product and verify cart

  Scenario: Add single product and verify cart
    Given User launches the application
    When User logins as "standard_user"
    And User adds single product to cart
    And User opens cart
    Then User verifies cart contains "1" item
