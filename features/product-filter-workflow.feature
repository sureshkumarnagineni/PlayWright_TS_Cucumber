Feature: Product Filter Workflow

  Scenario: Search and filter products by price
    Given User launches the application
    When User logins as "standard_user"
    And User filters products by low to high price
    Then User verifies first product is cheaper than last product
