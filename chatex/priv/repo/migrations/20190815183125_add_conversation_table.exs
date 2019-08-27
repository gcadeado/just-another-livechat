defmodule Chatex.Repo.Migrations.AddConversationTable do
  use Ecto.Migration

  def change do
    create table(:conversations) do
      add :user_id, references(:users)
      add :open, :boolean
      add :origin, :string
      timestamps()
    end
  end

end
