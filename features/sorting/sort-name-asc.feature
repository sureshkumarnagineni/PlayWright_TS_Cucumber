Feature: Sort products by name A to Z

  Scenario: Sort products by name A to Z
    Given User launches the application
    When User logins as "standard_user"
    And User sorts products by "Name (A to Z)"
    Then User verifies products are sorted alphabetically A to Z
