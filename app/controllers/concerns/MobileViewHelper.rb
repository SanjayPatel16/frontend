module MobileViewHelper
  extend ActiveSupport::Concern

  included do
    helper_method :title
    helper_method :full_link
  end

  private

  def title
    @article.title
  end

  def full_link

  end
end
