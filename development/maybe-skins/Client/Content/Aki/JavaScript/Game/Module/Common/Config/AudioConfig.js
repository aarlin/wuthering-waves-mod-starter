"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AudioConfig = void 0);
const AudioById_1 = require("../../../../Core/Define/ConfigQuery/AudioById"),
	MapAudioById_1 = require("../../../../Core/Define/ConfigQuery/MapAudioById"),
	RoleAudioById_1 = require("../../../../Core/Define/ConfigQuery/RoleAudioById"),
	ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class AudioConfig extends ConfigBase_1.ConfigBase {
	GetAudioPath(e) {
		return AudioById_1.configAudioById.GetConfig(e);
	}
	GetMapConfig(e) {
		return MapAudioById_1.configMapAudioById.GetConfig(e);
	}
	GetRoleConfig(e) {
		return RoleAudioById_1.configRoleAudioById.GetConfig(e);
	}
}
exports.AudioConfig = AudioConfig;
