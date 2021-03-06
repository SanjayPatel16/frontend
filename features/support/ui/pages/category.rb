require_relative '../page'
require_relative '../sections/child_category'

module UI::Pages
  class Category < UI::Page
    set_url '{/locale}/categories{/id}'

    element :description, '.l-category__top__intro'

    elements :filterable_items, '.category-filter li a'

    # can have one of the following two
    sections :child_categories, UI::Sections::ChildCategory, '.category-detail'
    elements :items, 'ol li a'
    element :breadcrumbs, '.l-context-bar'
  end
end
