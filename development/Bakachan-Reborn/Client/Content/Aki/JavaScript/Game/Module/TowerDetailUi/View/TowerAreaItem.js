"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerAreaItem = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	TowerData_1 = require("../TowerData"),
	TowerModel_1 = require("../TowerModel");
class TowerAreaItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(),
			(this.RHt = !0),
			(this.rLo = -1),
			(this.EPe = void 0),
			(this.nLo = -1),
			(this.sLo = () => {
				this.RHt
					? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"NeedClearLastDifficulty",
						)
					: (this.EPe.StopCurrentSequence(),
						this.EPe.PlaySequencePurely("Click"));
			}),
			(this.WFt = (e) => {
				"Click" === e &&
					UiManager_1.UiManager.OpenView("TowerFloorView", this.rLo);
			}),
			(this.aLo = () => {
				var e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(
					this.nLo,
				);
				this.hLo(e);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIButtonComponent],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIItem],
		]),
			(this.BtnBindInfo = [[4, this.sLo]]);
	}
	OnStart() {
		(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			this.EPe.BindSequenceCloseEvent(this.WFt),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnTowerRefresh,
				this.aLo,
			),
			this.GetText(1).SetUIActive(!1);
	}
	Refresh(e) {
		var t = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(e);
		(this.nLo = e), (this.rLo = t.AreaNum);
		let r = "";
		switch (t.AreaNum) {
			case 1:
			default:
				r = "Text_TowerOne_Text";
				break;
			case 2:
				r =
					t.Difficulty === TowerData_1.VARIATION_RISK_DIFFICULTY
						? "Text_TowerThree_Text"
						: "Text_TowerTwo_Text";
				break;
			case 3:
				r =
					t.Difficulty === TowerData_1.VARIATION_RISK_DIFFICULTY
						? "Text_TowerTwo_Text"
						: "Text_TowerThree_Text";
		}
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), r), this.hLo(t);
	}
	hLo(e) {
		var t = ModelManager_1.ModelManager.TowerModel.GetAreaAllStars(
				e.Difficulty,
				e.AreaNum,
			),
			r = this.GetText(3);
		if (
			((this.RHt = ModelManager_1.ModelManager.TowerModel.CurrentTowerLock),
			this.GetItem(8)?.SetUIActive(!0),
			this.GetItem(9)?.SetUIActive(!1),
			this.RHt)
		) {
			this.GetItem(0).SetUIActive(!0),
				this.GetItem(5).SetUIActive(!1),
				this.GetItem(6).SetUIActive(!1),
				r.SetText("0/" + t);
			const e = UE.Color.FromHex(TowerModel_1.LOCK_COLOR);
			r.SetColor(e), this.GetItem(7).SetColor(e);
		} else {
			this.GetItem(0).SetUIActive(!1),
				(e = ModelManager_1.ModelManager.TowerModel.GetAreaStars(
					e.Difficulty,
					e.AreaNum,
				)),
				r.SetText(e + "/" + t),
				(t = t === e),
				this.GetItem(5).SetUIActive(!t),
				this.GetItem(6).SetUIActive(t);
			const o = UE.Color.FromHex(
				t ? TowerModel_1.FINISH_COLOR : TowerModel_1.NORMOL_COLOR,
			);
			r.SetColor(o), this.GetItem(7).SetColor(o);
		}
	}
	OnBeforeDestroy() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnTowerRefresh,
			this.aLo,
		),
			(this.RHt = !0),
			this.EPe?.Clear(),
			(this.EPe = void 0);
	}
}
exports.TowerAreaItem = TowerAreaItem;
