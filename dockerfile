FROM mcr.microsoft.dom/dotnet/sdk:7.0 AS build-env
WORKDIR /app

#copy .csproj restore as distince layers
COPY "Reactivities2.sln" "Reactivities2.sln"
COPY "API/API.csproj" "API/API.csproj"
COPY "Application/Application.csproj" "Application/Application.csproj"
COPY "Persistence/Persistence.csproj" "Persistence/Persistence.csproj"
COPY "Domain/Domain.csproj" "Domain/Domain.csproj"
COPY "Infrastructure/Infrastructure.csproj" "Infrastructure/Infrastructure.csproj"

RUN dotnet restore "Reactivities2.sln"

#copy everything else and build
COPY . .
RUN dotnet publish -c Release -o out

#build a runtime image
FROM mcr.microsoft.dom/dotnet/aspnet:7.0
COPY --from=build-env /app/out . 
ENTRYPOINT [ "dotnet", "API.dll" ]