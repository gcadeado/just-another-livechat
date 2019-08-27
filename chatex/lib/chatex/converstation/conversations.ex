defmodule Chatex.Conversations do
  import Ecto.Query

  def get_conversation_id(origin) do
    conversation =
      Chatex.Conversation
      |> where([o], o.origin == ^origin)
      |> where([o], o.open == true)
      |> last()
      |> Chatex.Repo.one()
      |> case do
        nil ->
          {:ok, message} = %Chatex.Conversation{}
          |> Chatex.Conversation.changeset(%{open: true, origin: origin})
          |> Chatex.Repo.insert()
          message

        message ->
          message
      end
      |> IO.inspect

    {:ok, conversation.id}
  end
end
