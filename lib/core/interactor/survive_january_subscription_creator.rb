module Core
  class SurviveJanuarySubscriptionCreator
    attr_reader :subscription

    def initialize(email)
      @subscription = NewsletterSubscription.new(email: email)
    end

    def call
      return false unless subscription.valid?

      result = Core::Registry::Repository[:survive_january_subscription].delay(queue: 'newsletter_crm').register(subscription.email)

      if result
        result
      elsif block_given?
        yield
      else
        false
      end
    end
  end
end