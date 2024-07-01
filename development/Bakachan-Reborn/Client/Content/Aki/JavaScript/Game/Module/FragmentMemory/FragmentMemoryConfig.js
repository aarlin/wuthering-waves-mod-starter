"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FragmentMemoryConfig = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	ClueContentByGroupId_1 = require("../../../Core/Define/ConfigQuery/ClueContentByGroupId"),
	ClueEntranceById_1 = require("../../../Core/Define/ConfigQuery/ClueEntranceById"),
	PhotoMemoryActivityById_1 = require("../../../Core/Define/ConfigQuery/PhotoMemoryActivityById"),
	PhotoMemoryCollectById_1 = require("../../../Core/Define/ConfigQuery/PhotoMemoryCollectById"),
	PhotoMemoryCollectByTopicID_1 = require("../../../Core/Define/ConfigQuery/PhotoMemoryCollectByTopicID"),
	PhotoMemoryTopicAll_1 = require("../../../Core/Define/ConfigQuery/PhotoMemoryTopicAll"),
	PhotoMemoryTopicById_1 = require("../../../Core/Define/ConfigQuery/PhotoMemoryTopicById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class FragmentMemoryConfig extends ConfigBase_1.ConfigBase {
	GetPhotoMemoryTopicById(o) {
		return PhotoMemoryTopicById_1.configPhotoMemoryTopicById.GetConfig(o);
	}
	GetAllPhotoMemoryTopic() {
		return PhotoMemoryTopicAll_1.configPhotoMemoryTopicAll.GetConfigList();
	}
	GetPhotoMemoryCollectConfigListByTopicId(o) {
		return PhotoMemoryCollectByTopicID_1.configPhotoMemoryCollectByTopicID.GetConfigList(
			o,
		);
	}
	GetPhotoMemoryCollectById(o) {
		return PhotoMemoryCollectById_1.configPhotoMemoryCollectById.GetConfig(o);
	}
	GetPhotoMemoryActivityById(o) {
		return PhotoMemoryActivityById_1.configPhotoMemoryActivityById.GetConfig(o);
	}
	GetClueEntrance(o) {
		return ClueEntranceById_1.configClueEntranceById.GetConfig(o);
	}
	GetClueContent(o) {
		return ClueContentByGroupId_1.configClueContentByGroupId.GetConfigList(o);
	}
	GetTopicNotOpenTexturePath() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"FragmentMemoryNotOpenTexture",
		);
	}
	GetTopicNotOpenTextureLightPath() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"FragmentMemoryNotOpenLightTexture",
		);
	}
}
exports.FragmentMemoryConfig = FragmentMemoryConfig;
