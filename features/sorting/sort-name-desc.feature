Feature: Sort products by name Z to A

  Scenario: Sort products by name Z to A
    Given User launches the application
    When User logins as "standard_user"
    And User sorts products by "Name (Z to A)"
    Then User verifies products are sorted alphabetically Z to A
