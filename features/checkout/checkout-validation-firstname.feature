Feature: Checkout validation for first name

  Scenario: Checkout fails with empty first name
    Given User launches the application
    When User logins as "standard_user"
    And User adds product to cart and navigates to checkout
    And User enters checkout info with empty first name
    Then User verifies checkout error "Error: First Name is required"
