"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerApplyFloorDataView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	TowerController_1 = require("../TowerController"),
	TowerData_1 = require("../TowerData"),
	TowerRoleComplexItem_1 = require("./TowerRoleComplexItem");
class TowerApplyFloorDataView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.oLo = () => {
				this.CloseMe();
			}),
			(this.nNt = () => {
				TowerController_1.TowerController.TowerApplyFloorDataRequest(!0),
					this.CloseMe();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIButtonComponent],
			[7, UE.UIButtonComponent],
			[8, UE.UIItem],
			[9, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[6, this.oLo],
				[7, this.nNt],
			]);
	}
	OnStart() {
		this.h7e();
	}
	h7e() {
		var e = ModelManager_1.ModelManager.TowerModel.CurrentNotConfirmedFloor;
		if (e) {
			var o = ModelManager_1.ModelManager.TowerModel.GetFloorData(e.TowerId),
				t = this.GetItem(8),
				r = this.GetItem(5);
			for (let o = 0; o < e.Star; o++)
				LguiUtil_1.LguiUtil.DuplicateActor(t.GetOwner(), r);
			var i = this.GetItem(3);
			for (let e = 0; e < o.Star; e++)
				LguiUtil_1.LguiUtil.DuplicateActor(t.GetOwner(), i);
			t.SetUIActive(!1);
			var a = this.GetItem(9),
				l = this.GetItem(4),
				n = [];
			for (const o of e.Formation) n.push(o.l3n);
			for (const e of n) {
				var s = LguiUtil_1.LguiUtil.CopyItem(a, l);
				const o = new TowerRoleComplexItem_1.TowerRoleComplexItem();
				o.CreateThenShowByActorAsync(s.GetOwner()).finally(() => {
					o.RefreshRoleId(e);
				});
			}
			var w = this.GetItem(2),
				I = [];
			for (const e of o.Formation) I.push(e.l3n);
			for (const e of I) {
				var U = LguiUtil_1.LguiUtil.CopyItem(a, w);
				const o = new TowerRoleComplexItem_1.TowerRoleComplexItem();
				o.CreateThenShowByActorAsync(U.GetOwner()).finally(() => {
					o.RefreshRoleId(e);
				});
			}
			a.SetUIActive(!1);
			let g = "";
			g =
				e.Difficulties === TowerData_1.LOW_RISK_DIFFICULTY
					? "Text_LowRiskAreaFloor_Text"
					: e.Difficulties === TowerData_1.HIGH_RISK_DIFFICULTY
						? "Text_HighRiskAreaFloor_Text"
						: "Text_VariationAreaFloor_Text";
			var T = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerAreaName(
				e.TowerId,
			);
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), g, T, e.FloorNumber);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"CycleTower",
					5,
					"打开爬塔成绩确认框时失败，未能获取到新挑战数据",
				);
	}
	OnBeforeDestroy() {
		ModelManager_1.ModelManager.TowerModel.ClearNotConfirmedData();
	}
}
exports.TowerApplyFloorDataView = TowerApplyFloorDataView;
