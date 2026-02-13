Feature: Cancel checkout and return to cart

  Scenario: Cancel checkout and return to cart
    Given User launches the application
    When User logins as "standard_user"
    And User adds product to cart and navigates to checkout
    And User clicks cancel on checkout page
    Then User verifies cart page is displayed
