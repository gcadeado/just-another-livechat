defmodule ChatexWeb.Router do
  use ChatexWeb, :router
  alias Chatex.Guardian

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug CORSPlug, origin: "http://localhost:8080"
    plug :accepts, ["json"]
  end

  pipeline :jwt_authenticated do
    plug Guardian.AuthPipeline
  end

  scope "/", ChatexWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  scope "/api/v1", ChatexWeb do
    pipe_through :api
    post "/login", UserController, :sign_in
    post "/message", MessageController, :receive_message
  end

  scope "/api/v1", ChatexWeb do
    pipe_through [:api, :jwt_authenticated]
    post "/users", UserController, :create
    get "/user", UserController, :show
  end
end
