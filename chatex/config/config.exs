# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :chatex,
  ecto_repos: [Chatex.Repo]

# Configures the endpoint
config :chatex, ChatexWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "QTw7+FkIqGbHAZs0PJVrt7a/s3jDpMGcAM4KXeptTIpo3pULdK1somBX/6oBF3aU",
  render_errors: [view: ChatexWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Chatex.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Guardian config
config :chatex, Chatex.Guardian,
  issuer: "chatex",
  secret_key: "5jHEYDNPzkZcsEn9yDAfvLEo/A7rLAlRVY/niibk5q9YkcO5smULfogWn/WSy32U"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
