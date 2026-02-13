Feature: Checkout validation for last name

  Scenario: Checkout fails with empty last name
    Given User launches the application
    When User logins as "standard_user"
    And User adds product to cart and navigates to checkout
    And User enters checkout info with empty last name
    Then User verifies checkout error "Error: Last Name is required"
