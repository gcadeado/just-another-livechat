defmodule Chatex.Conversation do
  use Ecto.Schema
  import Ecto.Changeset

  schema "conversations" do
    field :open, :boolean
    field :origin, :string
    belongs_to :user, Chatex.Accounts.User

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:origin, :open])
  end
end
