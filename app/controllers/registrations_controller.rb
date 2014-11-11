class RegistrationsController < Devise::RegistrationsController
  skip_before_action :store_location
  before_action :configure_permitted_parameters

  def edit
    head :not_implemented
  end

  protected

  def build_resource(hash = nil)
    if hash
      hash[:accept_terms_conditions] = true
      hash[:newsletter_subscription] = true unless request.post?
    end
    super
  end

  private

  def after_sign_up_path_for(*)
    session[:user_return_to] || root_path
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :first_name
    devise_parameter_sanitizer.for(:sign_up) << :post_code
    devise_parameter_sanitizer.for(:sign_up) << :newsletter_subscription
  end
end
