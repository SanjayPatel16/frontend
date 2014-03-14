class CategoryDecorator < Draper::Decorator
  delegate :title, :description
  delegate :grandparent?, :parent?, :child?

  def contents
    CategoryContentDecorator.decorate_collection(object.contents || [])
  end

  def path
    h.category_path(object.id)
  end
end
