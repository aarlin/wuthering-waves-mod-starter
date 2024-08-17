"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattlePassRewardView = void 0);
const UE = require("ue"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
	BattlePassBackgroundPanel_1 = require("./BattlePassBackgroundPanel"),
	BattlePassRewardGridItem_1 = require("./BattlePassRewardGridItem");
class BattlePassRewardView extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.fki = !1),
			(this.pki = !1),
			(this.vki = void 0),
			(this.Mki = void 0),
			(this.v5t = void 0),
			(this.Eki = () => {
				UiManager_1.UiManager.OpenView("BattlePassPayView", this.ExtraParams);
			}),
			(this.yki = () => {
				var e = {
					WeaponDataList:
						ModelManager_1.ModelManager.BattlePassModel.GetWeaponDataList(),
					SelectedIndex: 0,
					WeaponObservers: this.ExtraParams,
				};
				UiManager_1.UiManager.OpenView("WeaponPreviewView", e);
			}),
			(this.Iki = () =>
				new BattlePassRewardGridItem_1.BattlePassRewardGridItem()),
			(this.Tki = () => {
				this.GetItem(2).SetUIActive(
					ModelManager_1.ModelManager.BattlePassModel.PayType ===
						Protocol_1.Aki.Protocol.B2s.Proto_NoPaid,
				);
			}),
			(this.Lki = () => {
				var e;
				this.fki &&
					((this.fki = !1),
					(e =
						ModelManager_1.ModelManager.BattlePassModel.GetCurrentShowLevel()),
					this.v5t.ScrollToGridIndex(e - 1));
			}),
			(this.Dki = (e) => {
				e ? this.v5t.RefreshGridProxy(e) : this.v5t.RefreshAllGridProxies(),
					this.Rki();
			}),
			(this.Mni = () => {
				(this.fki = !0),
					this.v5t.RefreshByData(
						ModelManager_1.ModelManager.BattlePassModel.RewardDataList,
					);
			}),
			(this.Rki = () => {
				var e = this.v5t.Ndi;
				(e = this.v5t.TryGetCachedData(e)) &&
					((e = e.Level - 1),
					0 !==
						(e =
							ModelManager_1.ModelManager.BattlePassModel.GetNextStageLevel(
								e,
							))) &&
					this.Mki.Refresh(
						ModelManager_1.ModelManager.BattlePassModel.GetRewardData(e),
						!1,
						0,
					);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIButtonComponent],
			[2, UE.UIItem],
			[3, UE.UILoopScrollViewComponent],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[1, this.Eki],
				[6, this.yki],
			]);
	}
	async OnBeforeStartAsync() {
		(this.Mki = new BattlePassRewardGridItem_1.BattlePassRewardGridItem()),
			(this.vki = new BattlePassBackgroundPanel_1.BattlePassBackgroundPanel());
		var e = { IsRewardPanel: !0, WeaponObservers: this.ExtraParams };
		await Promise.all([
			this.Mki.OnlyCreateByActorAsync(this.GetItem(4).GetOwner()),
			this.vki.OnlyCreateByActorAsync(this.GetItem(0).GetOwner(), e),
		]),
			this.AddChild(this.Mki),
			this.AddChild(this.vki);
	}
	OnStart() {
		(this.pki = !0),
			this.GetItem(2).SetUIActive(
				ModelManager_1.ModelManager.BattlePassModel.PayType ===
					Protocol_1.Aki.Protocol.B2s.Proto_NoPaid,
			),
			(this.v5t = new LoopScrollView_1.LoopScrollView(
				this.GetLoopScrollViewComponent(3),
				this.GetItem(5).GetOwner(),
				this.Iki,
			)),
			this.v5t.BindOnScrollValueChanged(this.Rki),
			this.v5t.BindLateUpdate(this.Lki);
	}
	OnBeforeShow() {
		this.Mni();
	}
	OnAfterShow() {
		this.UiViewSequence?.PlaySequence(this.pki ? "Start" : "Switch"),
			(this.pki = !1);
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.GetBattlePassRewardEvent,
			this.Dki,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ReceiveBattlePassDataEvent,
				this.Mni,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BattlePassFirstUnlockAnime,
				this.Tki,
			);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.GetBattlePassRewardEvent,
			this.Dki,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ReceiveBattlePassDataEvent,
				this.Mni,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.BattlePassFirstUnlockAnime,
				this.Tki,
			);
	}
	OnBeforeDestroy() {
		this.v5t && (this.v5t.ClearGridProxies(), (this.v5t = void 0));
	}
}
exports.BattlePassRewardView = BattlePassRewardView;
