Feature: Sort products by price high to low

  Scenario: Sort products by price high to low
    Given User launches the application
    When User logins as "standard_user"
    And User sorts products by "Price (high to low)"
    Then User verifies products are sorted by price descending
