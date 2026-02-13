Feature: Continue shopping from cart

  Scenario: Continue shopping from cart
    Given User launches the application
    When User logins as "standard_user"
    And User adds product to cart and opens cart
    And User clicks continue shopping
    Then User verifies products page is displayed
