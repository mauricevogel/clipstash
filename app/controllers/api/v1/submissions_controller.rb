class Api::V1::SubmissionsController < Api::V1::ApiController
  before_action :set_subreddit, only: :by_subreddit

  DEFAULT_PAGE_SIZE = 40

  def show
    @submission = Submission.friendly.find(params[:slug])

    render json: @submission, include: ["subreddit", "medium"]
  end

  def by_subreddit
    @submissions = Submissions::Search
                       .call(@subreddit.id, params[:sort], params[:after_score])
                       .page(params[:page])
                       .per(params[:max_results] ? params[:max_results] : DEFAULT_PAGE_SIZE)

    render json: @submissions, include: [], meta: pagination_dict(@submissions)
  end

  private

    def set_subreddit
      @subreddit = Subreddit.find_by_display_name!(params[:display_name])
    end
end
