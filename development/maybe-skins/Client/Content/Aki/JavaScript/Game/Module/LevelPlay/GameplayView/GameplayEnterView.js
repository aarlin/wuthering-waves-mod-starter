"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameplayEnterView = void 0);
const UE = require("ue"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	PublicUtil_1 = require("../../../Common/PublicUtil"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	GameplayViewDefine_1 = require("./GameplayViewDefine");
class GameplayEnterView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.TimerId = void 0),
			(this.jJe = () => {
				this.Ifi();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
		];
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.TextLanguageChange,
			this.jJe,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.TextLanguageChange,
			this.jJe,
		);
	}
	OnStart() {
		this.Ifi();
	}
	Ifi() {
		var e,
			t = this.OpenParam;
		t &&
			((e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
				t.InfoId ?? "",
			)),
			(t = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TitleId ?? "")),
			this.GetText(0).SetText(e ?? ""),
			this.GetText(1).SetText(t));
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
exports.GameplayEnterView = GameplayEnterView;
