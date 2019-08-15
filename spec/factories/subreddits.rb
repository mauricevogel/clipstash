# == Schema Information
#
# Table name: subreddits
#
#  id                    :bigint           not null, primary key
#  reddit_fullname       :string
#  display_name          :string
#  display_name_prefixed :string
#  public_description    :text
#  subscribers           :integer
#  icon_image            :string
#  icon_size             :string
#  banner_image          :string
#  banner_size           :string
#  over18                :boolean
#  created_utc           :date
#  url                   :string
#  status_cd             :integer
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#

FactoryBot.define do
  factory :subreddit do
    reddit_fullname { "MyString" }
    display_name { "MyString" }
    display_name_prefixed { "MyString" }
    public_description { "MyText" }
    subscribers { 1 }
    icon_image { "MyString" }
    icon_size { "MyString" }
    banner_image { "MyString" }
    banner_size { "MyString" }
    over18 { false }
    created_utc { "2019-08-15" }
    url { "MyString" }
    status_cd { 1 }
  end
end
