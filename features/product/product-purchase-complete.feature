Feature: Successfully purchase product

  Scenario: Successfully purchase a product as a Standard User
    Given User launches the application
    When User logins as "standard_user"
    And User adds product to cart and completes checkout
    Then User verifies order confirmation "Thank you for your order!"
