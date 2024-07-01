"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChatConfig = void 0);
const ChatById_1 = require("../../../Core/Define/ConfigQuery/ChatById"),
	ChatExpressionAll_1 = require("../../../Core/Define/ConfigQuery/ChatExpressionAll"),
	ChatExpressionByGroupId_1 = require("../../../Core/Define/ConfigQuery/ChatExpressionByGroupId"),
	ChatExpressionById_1 = require("../../../Core/Define/ConfigQuery/ChatExpressionById"),
	ChatExpressionGroupAll_1 = require("../../../Core/Define/ConfigQuery/ChatExpressionGroupAll"),
	ChatExpressionGroupById_1 = require("../../../Core/Define/ConfigQuery/ChatExpressionGroupById"),
	QuickChatAll_1 = require("../../../Core/Define/ConfigQuery/QuickChatAll"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class ChatConfig extends ConfigBase_1.ConfigBase {
	GetChatConfig(e) {
		return ChatById_1.configChatById.GetConfig(e);
	}
	GetAllQuickChatConfigList() {
		return QuickChatAll_1.configQuickChatAll.GetConfigList();
	}
	GetAllExpressionConfigByGroupId(e) {
		return ChatExpressionByGroupId_1.configChatExpressionByGroupId.GetConfigList(
			e,
		);
	}
	GetAllExpressionGroupConfig() {
		return ChatExpressionGroupAll_1.configChatExpressionGroupAll.GetConfigList();
	}
	GetExpressionGroupConfig(e) {
		return ChatExpressionGroupById_1.configChatExpressionGroupById.GetConfig(e);
	}
	GetExpressionConfig(e) {
		return ChatExpressionById_1.configChatExpressionById.GetConfig(e);
	}
	GetAllExpressionConfig() {
		return ChatExpressionAll_1.configChatExpressionAll.GetConfigList();
	}
}
exports.ChatConfig = ChatConfig;
