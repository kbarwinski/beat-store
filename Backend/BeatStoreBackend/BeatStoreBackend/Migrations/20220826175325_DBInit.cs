using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BeatStoreBackend.Migrations
{
    public partial class DBInit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    InvitationCode = table.Column<string>(type: "text", nullable: false),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    OrderId = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: true),
                    Totals = table.Column<decimal>(type: "numeric", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsFulfilled = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.OrderId);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderKey = table.Column<string>(type: "text", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    RoleId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AudioItems",
                columns: table => new
                {
                    AudioItemId = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Bpm = table.Column<int>(type: "integer", nullable: false),
                    LeasePrice = table.Column<decimal>(type: "numeric", nullable: false),
                    ExclusivePrice = table.Column<decimal>(type: "numeric", nullable: false),
                    AudioUrl = table.Column<string>(type: "text", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    IsBought = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AudioItems", x => x.AudioItemId);
                    table.ForeignKey(
                        name: "FK_AudioItems_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderItem",
                columns: table => new
                {
                    OrderItemId = table.Column<Guid>(type: "uuid", nullable: false),
                    AudioItemId = table.Column<Guid>(type: "uuid", nullable: false),
                    OrderId = table.Column<string>(type: "text", nullable: false),
                    LicenseType = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItem", x => x.OrderItemId);
                    table.ForeignKey(
                        name: "FK_OrderItem_AudioItems_AudioItemId",
                        column: x => x.AudioItemId,
                        principalTable: "AudioItems",
                        principalColumn: "AudioItemId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderItem_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "863bc1c5-9528-43da-adc7-b0e1eca46e03", "acf633f4-586b-4aab-a98e-d5df2ad4e5a3", "Author", "AUTHOR" },
                    { "de65816d-ffb1-43c4-b348-b886155b191f", "c70bc517-6869-4f89-af65-96eb27eca128", "Owner", "OWNER" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "InvitationCode", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "259c3c36-4fa7-4ec4-8865-3ca70a4c48ce", 0, "85273782-2b37-4449-b633-c091e7c2b42a", "Author3@test.com", true, "C", false, null, "AUTHOR3@TEST.COM", "AUTHOR3", "AQAAAAEAACcQAAAAELDt5cVweuupFKsXVfPZaFJOxZRNINIq2LuACWDcLTK2MDdznJL39UhxU+AKZG6qhA==", "XXXXXXXXX", true, "00000000-0000-0000-0000-000000000000", false, "Author3" },
                    { "32249352-0188-44c8-824d-00a16cd5ddf2", 0, "1b706495-03ff-4820-83c9-df2008dea3b1", "Author2@test.com", true, "B", false, null, "AUTHOR2@TEST.COM", "AUTHOR2", "AQAAAAEAACcQAAAAEO+pVl/0Y9nVYjgNAucRHoW6Fidi5Tpn9z5LjjrZx1v21amaxc+O/BS3gRFmbTirig==", "XXXXXXXXX", true, "00000000-0000-0000-0000-000000000000", false, "Author2" },
                    { "98597c35-4af6-4d59-b256-88a2852d8f14", 0, "f2067712-9450-4be1-ae11-f47afc351fb0", "Author1@test.com", true, "A", false, null, "AUTHOR1@TEST.COM", "AUTHOR1", "AQAAAAEAACcQAAAAEJjKXZwT4WPwF65RIAcm7FPGZinKXl6FfN5Sc8BmQQlP8iN395O1LxIjY3McbFUPQg==", "XXXXXXXXX", true, "00000000-0000-0000-0000-000000000000", false, "Author1" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { "863bc1c5-9528-43da-adc7-b0e1eca46e03", "259c3c36-4fa7-4ec4-8865-3ca70a4c48ce" },
                    { "863bc1c5-9528-43da-adc7-b0e1eca46e03", "32249352-0188-44c8-824d-00a16cd5ddf2" },
                    { "de65816d-ffb1-43c4-b348-b886155b191f", "98597c35-4af6-4d59-b256-88a2852d8f14" }
                });

            migrationBuilder.InsertData(
                table: "AudioItems",
                columns: new[] { "AudioItemId", "AudioUrl", "Bpm", "CreatedAt", "ExclusivePrice", "ImageUrl", "IsBought", "LeasePrice", "Title", "UserId" },
                values: new object[,]
                {
                    { new Guid("1b2919b0-e130-4413-b8a2-c6ffc22cacbb"), "https://dl.dropbox.com/s/1f3r9ja2nbx8k3j/Alan-Walker-Faded.mp3", 148, new DateTime(2022, 8, 26, 17, 53, 25, 434, DateTimeKind.Utc).AddTicks(741), 200.0m, "https://i.imgur.com/zBO8WcX.jpg", false, 20.99m, "Faded", "259c3c36-4fa7-4ec4-8865-3ca70a4c48ce" },
                    { new Guid("8b83d6c1-d616-48cd-85d5-6ae367ae0956"), "https://dl.dropbox.com/s/1xotb98otbuxkcy/Monkeys%20Spinning%20Monkeys.mp3", 157, new DateTime(2022, 8, 26, 17, 53, 25, 434, DateTimeKind.Utc).AddTicks(720), 300.0m, "https://i.imgur.com/0meaWWx.jpg", false, 30.99m, "Spinning Monkeys", "98597c35-4af6-4d59-b256-88a2852d8f14" },
                    { new Guid("bb73ac07-557d-4245-9b0c-2cde2eab40b0"), "https://dl.dropbox.com/s/hs413cz02o5eoh3/Sneaky%20Snitch.mp3", 108, new DateTime(2022, 8, 26, 17, 53, 25, 434, DateTimeKind.Utc).AddTicks(735), 400.0m, "https://i.imgur.com/NG9Kkt9.jpg", false, 40.99m, "Sneaky Snitch", "32249352-0188-44c8-824d-00a16cd5ddf2" },
                    { new Guid("bffdfce8-fcc4-4cec-b67e-cc67bcc52766"), "https://dl.dropbox.com/s/6kqet8538ejd2eb/Elektronomia_Sky_High.mp3", 148, new DateTime(2022, 8, 26, 17, 53, 25, 434, DateTimeKind.Utc).AddTicks(717), 200.0m, "https://i.imgur.com/cN2Z4uQ.jpg", false, 20.99m, "Sky High", "98597c35-4af6-4d59-b256-88a2852d8f14" },
                    { new Guid("d630139b-c969-4c64-bd9a-fc08c74ac596"), "https://dl.dropbox.com/s/gwhdglsiskvgdlh/Wallpaper.mp3", 203, new DateTime(2022, 8, 26, 17, 53, 25, 434, DateTimeKind.Utc).AddTicks(738), 500.0m, "https://i.imgur.com/sG55NPb.jpg", false, 50.99m, "Wallpaper", "32249352-0188-44c8-824d-00a16cd5ddf2" },
                    { new Guid("eab14bdc-edb7-47de-b886-30735ceaf9a4"), "https://dl.dropbox.com/s/jpdlkg1nvwu5e1v/Alan_Walker_-_The_Spectre_Olagist.co_.mp3", 173, new DateTime(2022, 8, 26, 17, 53, 25, 434, DateTimeKind.Utc).AddTicks(698), 100.0m, "https://i.imgur.com/dJedjOr.jpg", false, 10.99m, "The Spectre Olagist", "98597c35-4af6-4d59-b256-88a2852d8f14" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AudioItems_UserId",
                table: "AudioItems",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItem_AudioItemId",
                table: "OrderItem",
                column: "AudioItemId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItem_OrderId",
                table: "OrderItem",
                column: "OrderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "OrderItem");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AudioItems");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
