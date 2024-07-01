"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.READ_HISTORY_COUNT =
		exports.playerRealNameColor =
		exports.playerMarkNameColor =
		exports.CHAT_PANEL_DELAY =
		exports.REFRESH_PLAYER_INFO_TIME_DOWN =
		exports.FIRST_CHAT_SCROLL_DELAY =
		exports.CHAT_SCROLL_DELAY =
		exports.TEAM_CONTENT_RESOURCE_ID =
		exports.OWN_CHAT_CONTENT_RESOURCE_ID =
		exports.CHAT_CONTENT_RESOURCE_ID =
		exports.CHAT_CONTENT_QUEUE_SIZE =
			void 0);
const UE = require("ue");
(exports.CHAT_CONTENT_QUEUE_SIZE = 10),
	(exports.CHAT_CONTENT_RESOURCE_ID = "UiItem_ChatLeft_Prefab"),
	(exports.OWN_CHAT_CONTENT_RESOURCE_ID = "UiItem_ChatRight_Prefab"),
	(exports.TEAM_CONTENT_RESOURCE_ID = "UiItem_Zudui"),
	(exports.CHAT_SCROLL_DELAY = 200),
	(exports.FIRST_CHAT_SCROLL_DELAY = 500),
	(exports.REFRESH_PLAYER_INFO_TIME_DOWN = 1e4),
	(exports.CHAT_PANEL_DELAY = 500),
	(exports.playerMarkNameColor = UE.Color.FromHex("81540E")),
	(exports.playerRealNameColor = UE.Color.FromHex("#000000FF")),
	(exports.READ_HISTORY_COUNT = 10);
