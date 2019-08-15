defmodule Chatex.Guardian.AuthPipeline do
  use Guardian.Plug.Pipeline, otp_app: :Chatex,
  module: Chatex.Guardian,
  error_handler: Chatex.AuthErrorHandler

  plug Guardian.Plug.VerifyHeader, realm: "Bearer"
  plug Guardian.Plug.EnsureAuthenticated
  plug Guardian.Plug.LoadResource
end
