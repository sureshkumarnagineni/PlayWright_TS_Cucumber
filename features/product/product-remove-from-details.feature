Feature: Remove product from details page

  Scenario: Remove product from product details page
    Given User launches the application
    When User logins as "standard_user"
    And User clicks on first product
    And User adds product from details page
    And User removes product from details page
    Then User verifies cart badge is not visible
