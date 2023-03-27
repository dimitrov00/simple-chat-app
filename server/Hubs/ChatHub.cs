using Microsoft.AspNetCore.SignalR;
using SimpleChatApp.Hubs.Clients;
using SimpleChatApp.Models;

namespace SimpleChatApp.Hubs;

public class ChatHub : Hub<IChatClient>
{
}