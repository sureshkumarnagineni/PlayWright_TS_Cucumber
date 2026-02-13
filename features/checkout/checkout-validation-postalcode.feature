Feature: Checkout validation for postal code

  Scenario: Checkout fails with empty postal code
    Given User launches the application
    When User logins as "standard_user"
    And User adds product to cart and navigates to checkout
    And User enters checkout info with empty postal code
    Then User verifies checkout error "Error: Postal Code is required"
