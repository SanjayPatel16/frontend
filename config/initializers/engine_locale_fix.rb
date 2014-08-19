module Rails
  class Application
    class RoutesReloader

      def reload_with_engine_locale_fix!
        reload_without_engine_locale_fix!
      ensure

        problem_engines = Rails::Engine.descendants.keep_if do |engine|
          Rails.application.routes.routes.any? do |route|
            app = if route.app.is_a?(ActionDispatch::Routing::Mapper::Constraints)
              route.app.app
            else
              route.app
            end

            app == engine && route.required_parts.include?(:locale)
          end
        end

        problem_engines.map(&:instance).each do |engine|
          engine.routes.routes.each do |route|
            route.required_parts << :locale
          end
        end

      end

      alias_method_chain :reload!, :engine_locale_fix

    end
  end
end
