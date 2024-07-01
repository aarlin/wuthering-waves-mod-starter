"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotTextReplacer = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	TA = "{TA}",
	PLAYER_NAME = "{PlayerName}";
class PlotTextReplacer {
	constructor() {
		(this.gU = !1),
			(this.lJi = !1),
			(this.M8e = ""),
			(this._Ji = ""),
			(this.uJi = /\{(?:Male=(.*?);Female=(.*?)|TA|PlayerName)\}/g),
			(this.Dde = (e, t, i) =>
				void 0 !== t && void 0 !== i
					? this.lJi
						? t
						: i
					: e === TA
						? this._Ji
						: e === PLAYER_NAME
							? this.M8e
							: e);
	}
	Init() {
		this.gU ||
			((this.lJi =
				1 === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()),
			(this.M8e = ModelManager_1.ModelManager.FunctionModel.GetPlayerName()),
			(this._Ji = this.lJi
				? ConfigManager_1.ConfigManager.TextConfig.GetTextById("He")
				: ConfigManager_1.ConfigManager.TextConfig.GetTextById("She")),
			(this.gU = !0));
	}
	Clear() {
		this.gU = !1;
	}
	Replace(e, t = !1) {
		if (void 0 !== e)
			return t && this.Clear(), this.Init(), e.replace(this.uJi, this.Dde);
	}
}
exports.PlotTextReplacer = PlotTextReplacer;
