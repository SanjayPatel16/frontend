class RegistrationsController < Devise::RegistrationsController
  skip_before_action :store_location

  private

  def after_sign_up_path_for(resource)
    session[:user_return_to] || root_path
  end

  def set_flash_message(key, kind, options = {})
    super

    flash[:success] = flash[:notice]
    flash[:notice] = nil
  end
end
