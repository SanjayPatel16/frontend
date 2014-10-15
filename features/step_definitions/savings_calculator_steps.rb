When(/^I view the Savings Calculator in (.*)$/) do |language|
  locale = language_to_locale(language).to_sym
  paths = {
    en:  "/en/tools/#{ToolMountPoint::SavingsCalculator::EN_ID}",
    cy:  "/cy/tools/#{ToolMountPoint::SavingsCalculator::CY_ID}",
  }

  visit paths[locale]
end

Then(/^I should see the Savings Calculator in (.*)$/) do |language|
  locale = language_to_locale(language).to_sym
  expect(current_page.heading).to have_content(I18n.t('layouts.savings_calculator.application.title', locale: locale))
end

When(/^I translate the Savings Calculator into (.*)$/) do |language|
  locale           = language_to_locale(language)
  current_language = locale_to_language(I18n.locale)

  expect(current_page.footer_secondary.send("#{language.downcase}_link")[:lang]).to eq(locale)
  expect(current_page.footer_secondary).to_not send("have_#{current_language}_link")

  current_page.footer_secondary.send("#{language.downcase}_link").click
end
