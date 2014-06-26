require_relative '../page'

module UI::Pages
  class Static < UI::Page
    set_url '{/locale}/static{/id}'

    element :intro, 'p.intro'
    element :content, '.l-main'
    element :breadcrumbs, '.l-context-bar'
  end
end
