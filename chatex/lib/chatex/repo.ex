defmodule Chatex.Repo do
  use Ecto.Repo,
    otp_app: :chatex,
    adapter: Ecto.Adapters.Postgres
end
