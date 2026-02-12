Feature: Session Management - Logout Workflow

  Scenario: User performs action and then logs out successfully
    Given User launches the application
    When User logins as "standard_user"
    And User adds product to cart and completes checkout
    And User performs logout
    Then User verifies logout and redirected to login page
