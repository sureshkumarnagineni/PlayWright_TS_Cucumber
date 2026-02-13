Feature: Verify social media links

  Scenario: Verify social media links in footer
    Given User launches the application
    When User logins as "standard_user"
    Then User verifies Twitter link is present
    And User verifies Facebook link is present
    And User verifies LinkedIn link is present
