class DebtManagementController < ApplicationController
  layout '_unconstrained'

  def show
  end

  def faq
  end

  def display_menu_button_in_header?
    false
  end

  def hide_contact_panels?
    true
  end
  helper_method :hide_contact_panels?
end
