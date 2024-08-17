"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameplayFirstPassView = void 0);
const UE = require("ue"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	PublicUtil_1 = require("../../../Common/PublicUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	GameplayViewDefine_1 = require("./GameplayViewDefine");
class GameplayFirstPassView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments), (this.TimerId = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
		];
	}
	OnStart() {
		var e,
			i = this.OpenParam;
		i &&
			((e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
				i.InfoId ?? "",
			)),
			(i = PublicUtil_1.PublicUtil.GetConfigTextByKey(i.TitleId ?? "")),
			this.Ifi(e, i));
	}
	Ifi(e, i) {
		this.GetText(0).SetText(e ?? ""), this.GetText(1).SetText(i);
	}
	OnAfterPlayStartSequence() {
		this.TBt();
	}
	TBt() {
		this.TimerId = TimerSystem_1.TimerSystem.Delay(() => {
			this.$Oe();
		}, GameplayViewDefine_1.DelayCloseTime);
	}
	$Oe() {
		(this.TimerId = void 0), this.CloseMe();
	}
	OnBeforeDestroy() {
		void 0 !== this.TimerId &&
			(TimerSystem_1.TimerSystem.Remove(this.TimerId), (this.TimerId = void 0));
	}
}
exports.GameplayFirstPassView = GameplayFirstPassView;
