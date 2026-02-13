Feature: Verify cart persistence

  Scenario: Verify cart persistence after adding products
    Given User launches the application
    When User logins as "standard_user"
    And User adds product to cart
    And User navigates to another page and back
    Then User verifies cart badge still shows "1"
