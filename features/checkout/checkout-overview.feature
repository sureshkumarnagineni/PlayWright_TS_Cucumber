Feature: Verify checkout overview information

  Scenario: Verify checkout overview displays correct information
    Given User launches the application
    When User logins as "standard_user"
    And User adds product to cart and proceeds to overview
    Then User verifies payment information is displayed
    And User verifies shipping information is displayed
    And User verifies total price is displayed
