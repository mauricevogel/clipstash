require 'rails_helper'

RSpec.describe Api::V1::SubredditsController, type: :controller do
  API_CONFIG = Rails.configuration.api_config

  before(:each) do
    100.times do |n|
      create(:subreddit)
    end

    request.headers["accept"] = 'application/json'
  end

  describe 'includes FilterParamsConcern' do
    it { expect(Api::V1::SubmissionsController.ancestors.include? Api::Concerns::FilterParams).to eq(true) }
  end

  describe 'GET #index' do
    subject { get :index, as: :json }

    subject { get :index, params: { sort: 'name' }, as: :json }

    it 'returns sorted results' do
      body = JSON.parse(subject.body)
      expected_result = Subreddit.order(display_name: :asc).first.display_name

      expect(body['subreddits'][0]['display_name']).to eq(expected_result)
    end

    include_examples "result key length",
                     "subreddits", API_CONFIG["subreddits"]["index"]["default_results"]
    include_examples "pagination examples"
  end

  describe 'GET #show' do
    subject { get :show, params: { display_name: Subreddit.first.display_name }, as: :json }

    it { is_expected.to be_successful }

    it "returns the correct subreddit" do
      body = JSON.parse(subject.body)
      expect(body["subreddit"]["display_name"]).to eq(Subreddit.first.display_name)
    end
  end

  describe 'GET #recommended' do
    subject { get :recommended, as: :json }

    it { is_expected.to be_successful }

    it 'includes submissions' do
      body = JSON.parse(subject.body)
      body["subreddits"].each do |s|
        expect(s).to have_key("submissions")
      end
    end

    include_examples "result key length",
                     "subreddits", API_CONFIG["subreddits"]["recommended"]["default_results"]
    include_examples "pagination examples"
  end

  describe 'GET #popular' do
    subject { get :popular, as: :json }

    it { is_expected.to be_successful }

    it 'lists top 5 subreddits sorted by subscribers' do
      body = JSON.parse(subject.body)
      expected_subreddit_ids = Subreddit.order(subscribers: :desc).limit(5).map(&:id)
      actual_subreddit_ids = body['subreddits'].map { |d| d["id"].to_i }

      expect(actual_subreddit_ids).to eq(expected_subreddit_ids)
    end

    include_examples "result key length",
                     "subreddits", API_CONFIG["subreddits"]["popular"]["default_results"]
    include_examples "pagination examples"
  end
end
