Feature: Sign up
  As a visitor to the website
  I want to sign up for a MAS account
  So that I can sign in and get better financial tools and advice

Scenario: Sign up disabled
  When  I sign up
  Then  Sign up is not implemented

@enable-sign-up
Scenario: Sign up
  When  I sign up
  Then  My MAS account should be created
  And   I should be signed in
  And   I should see an "account created" notification
  And   I should be at the page I was on

@enable-sign-up
Scenario: Sign up from a direct link
  When I sign up from a direct link
  Then I should be at the home page

@enable-sign-up
Scenario Outline: Attempt to sign up with bad details
  When I attempt to sign up with <Problem>
  Then No MAS account should be created
  And  I should remain signed out
  And  I should receive a "<Problem>" validation error

  Examples:
    | Problem                                       |
    | badly formatted inputs                        |
    | an already registered email address           |
    | different password and password confirmations |
    | unaccepted terms & conditions                 |
    | insecure password                             |
