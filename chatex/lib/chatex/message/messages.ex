defmodule Chatex.Messages do
  def send_message(%{"text" => text, "origin" => origin} = values) do
    with {:ok, message} <- build_message(values),
         {:ok, conversation_id} <- Chatex.Conversations.get_conversation_id(origin) do
      message
      |> Chatex.Message.changeset(%{conversation_id: conversation_id})
      |> Chatex.Repo.insert()

      ChatexWeb.Endpoint.broadcast("conversation:#{conversation_id}", "new_message", %{text: text})
    end
  end

  def build_message(%{"text" => text}) do
    message =
      Chatex.Message.changeset(%Chatex.Message{
        type: "text",
        payload: %{text: text},
        sid: ""
      })

    {:ok, message}
  end
end
