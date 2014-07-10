module Newsletter
  class SubscriptionsController < ApplicationController

    def create
      if @success = Core::Newsletter::SubscriptionCreator.new(subscription_params).call
        flash[:success] = I18n.t('newsletter.subscription.success')
      else
        flash[:error] = I18n.t('newsletter.subscription.error')
      end

      respond_to do |format|
        format.js { render :show }
        format.html { redirect_to :back }
      end
    end

    private

    def subscription_params
      params.require(:subscription).permit(:email)
    end
  end
end
