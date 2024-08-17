"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SilentAreaView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView"),
	SilentAreaInfoPanel_1 = require("./SilentAreaInfoPanel");
class SilentAreaView extends BattleVisibleChildView_1.BattleVisibleChildView {
	constructor() {
		super(...arguments),
			(this.qct = void 0),
			(this.Gct = BigInt(0)),
			(this.Nsr = void 0),
			(this.kqe = (e) => {
				var t;
				e
					? ((e = this.GetItem(1)),
						(t = this.Nsr?.GetSilentAreaShowInfo()),
						this.qct.CreateAndShow("UiItem_HoverTipsC", e, t))
					: this.qct.EndShow();
			}),
			(this.Oct = () => {
				var e = this.GetExtendToggle(0);
				e &&
					(1 === e.GetToggleState()
						? e.SetToggleState(0, !0)
						: e.SetToggleState(1, !0));
			});
	}
	get Id() {
		return this.Gct;
	}
	Initialize(e) {
		super.Initialize(e),
			this.InitChildType(4),
			this.SetVisible(1, !1),
			(this.qct = new SilentAreaInfoPanel_1.SilentAreaInfoPanel()),
			this.Ore();
	}
	Reset() {
		super.Reset(), this.kre();
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.kqe]]);
	}
	Ore() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.BattleUiToggleSilentAreaInfoView,
			this.Oct,
		);
	}
	kre() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.BattleUiToggleSilentAreaInfoView,
			this.Oct,
		);
	}
	StartShow(e, t) {
		(this.Gct = e),
			(this.Nsr = t),
			this.qct.UpdateInfo(t.GetSilentAreaShowInfo()),
			this.SetVisible(1, !0),
			ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.SetEnvironmentKeyVisible(
				1,
				!0,
			);
	}
	EndShow() {
		this.qct.EndShow(),
			this.GetExtendToggle(0)?.SetToggleState(0, !0),
			this.SetVisible(1, !1),
			ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.SetEnvironmentKeyVisible(
				1,
				!1,
			);
	}
	OnAfterDestroy() {
		ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.SetEnvironmentKeyVisible(
			1,
			!1,
		);
	}
}
exports.SilentAreaView = SilentAreaView;
