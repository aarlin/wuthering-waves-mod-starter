"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LordGymController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../Core/Net/Net"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiManager_1 = require("../../Ui/UiManager"),
	ErrorCodeController_1 = require("../ErrorCode/ErrorCodeController"),
	ItemRewardController_1 = require("../ItemReward/ItemRewardController"),
	ItemRewardDefine_1 = require("../ItemReward/ItemRewardDefine"),
	RewardItemData_1 = require("../ItemReward/RewardData/RewardItemData");
class LordGymController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return this.OnRegisterNetEvent(), this.OnAddEvents(), !0;
	}
	static OnClear() {
		return this.OnUnRegisterNetEvent(), this.OnRemoveEvents(), !0;
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(12594, this.PSi), Net_1.Net.Register(28727, this.xSi);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(12594), Net_1.Net.UnRegister(28727);
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.b4e);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.WorldDone,
			this.b4e,
		);
	}
	static async LordGymInfoRequest() {
		var e = Protocol_1.Aki.Protocol.Lis.create({});
		e = await Net_1.Net.CallAsync(9653, e);
		if (
			(0 < e.pAs?.length &&
				((ModelManager_1.ModelManager.LordGymModel.UnLockLordGym = e.pAs),
				ModelManager_1.ModelManager.LordGymModel.UnLockLordGym.sort(
					(e, r) => e - r,
				)),
			e.MAs?.length &&
				(ModelManager_1.ModelManager.LordGymModel.ReadLoadGymIds = e.MAs),
			0 < e.SAs?.length)
		)
			for (const r of e.SAs)
				ModelManager_1.ModelManager.LordGymModel.LordGymRecord.set(r.b6n, r);
	}
	static async LordGymBeginRequest(e) {
		var r = Protocol_1.Aki.Protocol.Ais.create();
		return !(
			!(e = ((r.b6n = e), await Net_1.Net.CallAsync(29694, r))) ||
			(e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
				(ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(
					e.lkn,
					29694,
				),
				1))
		);
	}
	static async OpenLordGymEntrance(e) {
		return (
			await this.LordGymInfoRequest(),
			void 0 !==
				(await UiManager_1.UiManager.OpenViewAsync("LordGymEntranceView", e))
		);
	}
	static OpenGymUnlockTipView(e) {
		UiManager_1.UiManager.OpenView("LordGymUnlockTipView", e),
			(ModelManager_1.ModelManager.LordGymModel.FirstUnLockLordGym = []);
	}
	static async ReadLordGym(e) {
		ModelManager_1.ModelManager.LordGymModel.ReadLordGym(e);
		var r = Protocol_1.Aki.Protocol.Uis.create();
		(r.b6n = e), await Net_1.Net.CallAsync(29379, r);
	}
}
(exports.LordGymController = LordGymController),
	((_a = LordGymController).b4e = () => {
		_a.LordGymInfoRequest();
	}),
	(LordGymController.PSi = (e) => {
		ModelManager_1.ModelManager.LordGymModel.FirstUnLockLordGym = e.pAs;
	}),
	(LordGymController.xSi = (e) => {
		if (
			(ModelManager_1.ModelManager.LordGymModel.LordGymRecord.set(
				e.TAs.b6n,
				e.TAs,
			),
			e.QRs)
		) {
			var r = [];
			for (const t of e.LAs) {
				var o = new RewardItemData_1.RewardItemData(
					t.G3n,
					t.I5n,
					0 !== t.yAs ? t.yAs : void 0,
				);
				r.push(o);
			}
			var t = {
				TitleTextId: "LordGym_TimeTitle",
				Record: TimeUtil_1.TimeUtil.GetTimeString(e.TAs.EAs),
				IsNewRecord: e.IAs,
			};
			ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
				ItemRewardDefine_1.LORD_GYM_RESULT,
				e.QRs,
				r,
				t,
				void 0,
				[
					{
						ButtonTextId: "ConfirmBox_45_ButtonText_1",
						DescriptionTextId: void 0,
						IsTimeDownCloseView: !1,
						IsClickedCloseView: !0,
					},
				],
				void 0,
				void 0,
				() => {
					var r = ModelManager_1.ModelManager.LordGymModel.GetNextGymId(
						e.TAs.b6n,
					);
					r &&
						!ModelManager_1.ModelManager.LordGymModel.GetLordGymHasRead(r) &&
						ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(r) &&
						UiManager_1.UiManager.OpenView("LordGymUnlockTipView", r);
				},
			);
		}
	});
