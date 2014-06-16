require 'core/entities/article'
require 'core/entities/category'

RSpec.describe BreadcrumbTrail, '.build' do
  let(:article)               { Core::Article.new('the-article') }
  let(:category_title)        { 'the-category' }
  let(:category)              { Core::Category.new(category_title, title: category_title) }
  let(:parent_category_title) { 'the-category' }
  let(:parent_category)       { Core::Category.new(parent_category_title, title: parent_category_title) }
  let(:path_to_category)      { [parent_category, category] }
  let(:category_tree)         { double }

  before do
    allow(RootToNodePath).to receive(:build).with(category, category_tree).and_return(path_to_category)
  end

  context 'when item is an article' do
    subject { described_class.build(article, category_tree) }

    context 'and it exists in a single category' do
      before do
        expect(article).to receive(:categories).and_return([category]).twice
      end

      specify { expect(subject.map(&:title)).to eq([parent_category_title, category_title]) }
    end

    context 'and it exists in more than one category' do
      before do
        expect(article).to receive(:categories).and_return([double , double])
      end

      it { is_expected.to be_empty }
    end
  end

  context 'when item is a category' do
    subject { described_class.build(category, category_tree) }

    specify { expect(subject.map(&:title)).to eq([parent_category_title]) }
  end
end
