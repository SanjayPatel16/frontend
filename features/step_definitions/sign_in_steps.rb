When(/^I attempt to sign in$/) do
  sign_in_page.load
end

Then(/^I am told that the functionality is not implemented$/) do
  expect(status_code).to eql(501)
end


When(/^I sign in$/) do
  Rails.application.reload_routes!
  Devise.regenerate_helpers!

  email = 'testing@man.net'
  password = 'secretpass'
  User.new(:email => email, :password => password, :password_confirmation => password).save!
  sign_in_page.load(locale: 'en')
  sign_in_page.email.set email
  sign_in_page.password.set password
  sign_in_page.submit.click
end

Then(/^I should receive a "(.*?)" notification$/) do |arg1|
  expect(page.html).to include(notification)
end
