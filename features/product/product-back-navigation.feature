Feature: Navigate back to products

  Scenario: Navigate back to products from details page
    Given User launches the application
    When User logins as "standard_user"
    And User clicks on first product
    And User clicks back to products button
    Then User verifies products page is displayed
