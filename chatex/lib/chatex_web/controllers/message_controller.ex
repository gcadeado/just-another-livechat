defmodule ChatexWeb.MessageController do
  use ChatexWeb, :controller

  def receive_message(conn, %{"data" => data}) do
    Enum.map(data, fn message -> Chatex.Messages.send_message(message) end)

    conn
    |> put_status(200)
    |> json(%{})
  end
end
