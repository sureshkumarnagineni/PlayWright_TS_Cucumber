Feature: Complete checkout with valid information

  Scenario: Complete checkout with valid information
    Given User launches the application
    When User logins as "standard_user"
    And User adds product to cart and completes checkout
    Then User verifies order confirmation "Thank you for your order!"
