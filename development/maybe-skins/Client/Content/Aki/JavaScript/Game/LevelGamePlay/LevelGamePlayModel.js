"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelGamePlayModel = void 0);
const Queue_1 = require("../../Core/Container/Queue"),
	ModelBase_1 = require("../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../Manager/ControllerHolder"),
	UiLayer_1 = require("../Ui/UiLayer"),
	LevelGamePlayUtils_1 = require("./LevelGamePlayUtils");
class LevelGamePlayModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.pUe = !1),
			(this.vUe = !1),
			(this.MUe = void 0),
			(this.SUe = () => {
				this.SetWorldLoad(!0);
			}),
			(this.ZDe = () => {
				LevelGamePlayUtils_1.LevelGamePlayUtils.LevelEventBlockAll &&
					UiLayer_1.UiLayer.SetShowMaskLayer(
						"LevelEventSetPlayerOperation",
						!1,
					);
			}),
			(this.JDe = () => {
				LevelGamePlayUtils_1.LevelGamePlayUtils.LevelEventBlockAll &&
					UiLayer_1.UiLayer.SetShowMaskLayer(
						"LevelEventSetPlayerOperation",
						!0,
					);
			});
	}
	OnInit() {
		return (
			(this.pUe = !1),
			(this.vUe = !0),
			(this.MUe = new Queue_1.Queue()),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDone,
				this.SUe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.DisActiveBattleView,
				this.ZDe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ActiveBattleView,
				this.JDe,
			),
			!0
		);
	}
	AddLoadNotify(e) {
		this.MUe.Push(e), this.UpdateLoadNotify();
	}
	SetWorldLoad(e) {
		(this.pUe = e), this.UpdateLoadNotify();
	}
	SetWorldTeleport(e) {
		(this.vUe = e), this.UpdateLoadNotify();
	}
	UpdateLoadNotify() {
		if (this.vUe && this.pUe)
			for (; !this.MUe.Empty; ) {
				var e = this.MUe.Pop();
				e && e();
			}
	}
	ExecuteActions(e, t, i) {
		return ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActions(
			e,
			t,
			i,
		);
	}
	ExecuteActionsNew(e, t, i) {
		ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
			e,
			t,
			i,
		);
	}
	OnClear() {
		return (
			(this.pUe = !1),
			(this.vUe = !1),
			(this.MUe = void 0),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldDone,
				this.SUe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.DisActiveBattleView,
				this.ZDe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ActiveBattleView,
				this.JDe,
			),
			!0
		);
	}
}
exports.LevelGamePlayModel = LevelGamePlayModel;
