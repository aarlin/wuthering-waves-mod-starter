"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DailyActivityRewardItem = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	DailyActivityController_1 = require("../DailyActivityController"),
	DailyActivityDefine_1 = require("../DailyActivityDefine");
class DailyActivityRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.YOt = 0),
			(this.DailyActiveState = void 0),
			(this.JOt = () => {
				switch (this.DailyActiveState) {
					case 2:
						this.zOt(!1);
						break;
					case 1:
						this.ZOt();
						break;
					case 3:
						this.zOt(!0);
				}
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIButtonComponent],
			[2, UE.UISprite],
			[3, UE.UISprite],
			[4, UE.UISprite],
			[5, UE.UISprite],
			[6, UE.UINiagara],
			[7, UE.UINiagara],
			[8, UE.UIItem],
		]),
			(this.BtnBindInfo = [[1, this.JOt]]);
	}
	OnStart() {
		this.GetUiNiagara(6).SetAlpha(0), this.GetUiNiagara(7).SetUIActive(!1);
	}
	OnBeforeDestroy() {}
	Refresh(t, e, i) {
		(this.YOt = t),
			(t =
				ModelManager_1.ModelManager.DailyActivityModel.DailyActivityGoalMap.get(
					this.YOt,
				)) &&
				(this.SetRewardGoalValue(t.Goal),
				this.DailyActiveState !== t.State
					? this.RefreshRewardState(t.State, void 0 === this.DailyActiveState)
					: 3 === this.DailyActiveState &&
						this.GetUiNiagara(7).SetUIActive(!1));
	}
	RefreshSelf() {
		this.Refresh(this.YOt, !1, 0);
	}
	SetRewardGoalValue(t) {
		this.GetText(0).SetText(t.toString());
	}
	RefreshRewardState(t, e) {
		var i = [this.GetSprite(4), this.GetSprite(2), this.GetSprite(3)];
		for (let e = 0; e < i.length; e++) i[e].SetUIActive(e + 1 === t);
		this.GetItem(8).SetUIActive(1 === t),
			this.GetUiNiagara(6).SetAlpha(1 === t ? 1 : 0);
		var a = this.GetUiNiagara(7);
		3 !== t || e
			? (a.SetUIActive(!1), a.Deactivate())
			: (a.SetUIActive(!0), a.ActivateSystem(!0)),
			(e =
				2 === t
					? DailyActivityDefine_1.REWARD_BACKGROUND_COLOR_UNFINISHED
					: DailyActivityDefine_1.REWARD_BACKGROUND_COLOR_FINISHED),
			(a = UE.Color.FromHex(e));
		this.GetSprite(5).SetColor(a),
			(this.GetText(0).useChangeColor = 2 !== t),
			(this.DailyActiveState = t);
	}
	ZOt() {
		DailyActivityController_1.DailyActivityController.RequestAllAvailableActivityReward();
	}
	zOt(t) {
		var e = [];
		for (const a of ModelManager_1.ModelManager.DailyActivityModel.GetActivityRewardById(
			this.YOt,
		)) {
			var i = { Id: a[0].ItemId, Num: a[1], Received: t };
			e.push(i);
		}
		var a = {
			RewardLists: e,
			MountItem: this.GetButton(1).RootUIComp,
			PosBias: new UE.Vector(0, 30, 0),
		};
		(ModelManager_1.ModelManager.DailyActivityModel.RewardData = a),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshActivityRewardPopUp,
			);
	}
}
exports.DailyActivityRewardItem = DailyActivityRewardItem;
