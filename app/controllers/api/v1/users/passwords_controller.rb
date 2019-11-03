module Api
  module V1
    module Users
      class PasswordsController < DeviseTokenAuth::PasswordsController
        include Api::Concerns::ActsAsApiRequest
        protect_from_forgery with: :null_session
        skip_before_action :check_json_request, on: :edit
      end
    end
  end
end
