using SimpleChatApp.Models;

namespace SimpleChatApp.Hubs.Clients;

public interface IChatClient
{
    Task ReceiveMessage(ChatMessage message, CancellationToken cancellationToken = default);
}