Feature: Browser functions
  Browser should interact with webpage

  Scenario: goto
    Then I should be able to visit webpages

  Scenario: nested element
    Given I visit a webpage
    Then I should be able to access a nested element

  Scenario: regex locators
    Given I visit a webpage
    Then I can reference an element by regex

  Scenario: multiple elements
    Given I visit a webpage
    Then I can retrieve a list of prescription elements