Feature: Sort products by price low to high

  Scenario: Sort products by price low to high
    Given User launches the application
    When User logins as "standard_user"
    And User sorts products by "Price (low to high)"
    Then User verifies products are sorted by price ascending
