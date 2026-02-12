Feature: Cart Management Workflow

  Scenario: Add multiple products and manage cart operations
    Given User launches the application
    When User logins as "standard_user"
    And User adds multiple products to cart
    And User verifies cart item count
    And User removes a product from cart
    Then User verifies updated cart count
