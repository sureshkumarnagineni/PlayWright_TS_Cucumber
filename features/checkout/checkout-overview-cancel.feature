Feature: Cancel from checkout overview

  Scenario: Cancel from checkout overview
    Given User launches the application
    When User logins as "standard_user"
    And User adds product to cart and proceeds to overview
    And User clicks cancel on overview page
    Then User verifies products page is displayed
