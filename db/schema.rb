# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_08_15_113310) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "subreddits", force: :cascade do |t|
    t.string "reddit_fullname"
    t.string "display_name"
    t.string "display_name_prefixed"
    t.text "public_description"
    t.integer "subscribers"
    t.string "icon_image"
    t.string "icon_size"
    t.string "banner_image"
    t.string "banner_size"
    t.boolean "over18"
    t.date "created_utc"
    t.string "url"
    t.integer "status_cd"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["display_name"], name: "index_subreddits_on_display_name", unique: true
    t.index ["reddit_fullname"], name: "index_subreddits_on_reddit_fullname", unique: true
  end

end
