"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerResetView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	TowerController_1 = require("../TowerController"),
	TowerResetItem_1 = require("./TowerResetItem");
class TowerResetView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.RLo = -1),
			(this.Nke = void 0),
			(this.sBi = () => new TowerResetItem_1.TowerResetItem()),
			(this.oLo = () => {
				this.CloseMe();
			}),
			(this.nNt = () => {
				TowerController_1.TowerController.TowerResetRequest(this.RLo),
					this.CloseMe();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIVerticalLayout],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIButtonComponent],
			[4, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[3, this.oLo],
				[4, this.nNt],
			]);
	}
	OnStart() {
		this.h7e();
	}
	OnBeforeDestroy() {
		this.Nke = void 0;
	}
	h7e() {
		this.RLo = this.OpenParam;
		var e = ModelManager_1.ModelManager.TowerModel.GetFloorData(this.RLo);
		if (e) {
			this.Nke = new GenericLayout_1.GenericLayout(
				this.GetVerticalLayout(0),
				this.sBi,
			);
			var t = [];
			for (const o of e.Formation) t.push(o.l3n);
			this.Nke.RefreshByData(t);
			var o = ModelManager_1.ModelManager.TowerModel.GetDifficultyStars(
				e.Difficulties,
			);
			this.GetText(1).SetText("" + o),
				this.GetText(2).SetText("" + (o - e.Star));
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("CycleTower", 5, "重置爬塔成绩时，无法获取到爬塔数据", [
					"TowerId: ",
					this.RLo,
				]);
	}
}
exports.TowerResetView = TowerResetView;
