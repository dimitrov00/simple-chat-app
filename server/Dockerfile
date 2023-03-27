# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /source

COPY . .
RUN dotnet restore "SimpleChatApp.csproj" --disable-parallel
RUN dotnet publish "SimpleChatApp.csproj" -c release -o /app --no-restore

# Serve Stage
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app

COPY --from=build /app ./


# Specify the port that ASP.NET Core should listen on
ENV ASPNETCORE_URLS=http://+:7207

EXPOSE 7207

# Start the app
ENTRYPOINT ["dotnet", "SimpleChatApp.dll"]