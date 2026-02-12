Feature: Advanced Filtering Workflow

  Scenario: Filter products by price range and verify results
    Given User launches the application
    When User logins as "standard_user"
    And User applies price range filter
    And User sorts products by price ascending
    Then User verifies filtered products are within price range
