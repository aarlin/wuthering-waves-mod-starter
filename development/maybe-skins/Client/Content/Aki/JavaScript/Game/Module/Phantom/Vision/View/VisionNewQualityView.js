"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionNewQualityView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase"),
	GameModeController_1 = require("../../../../World/Controller/GameModeController"),
	CalabashController_1 = require("../../../Calabash/CalabashController"),
	SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid"),
	GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
	GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../../Util/LguiUtil");
class VisionNewQualityView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.Tvt = 0),
			(this.Lvt = void 0),
			(this.Xgt = void 0),
			(this.eGe = void 0),
			(this.KHi = void 0),
			(this.sGe = () => new QualityStarItem()),
			(this.Uvt = () => {
				var t;
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Calabash", 28, "跳转到鸣域终端收集页签", [
						"目标幻象Id",
						this.Lvt.PhantomItem.MonsterId,
					]),
					this.CloseViewOrShowNextData(),
					0 === this.KHi.SkinId
						? CalabashController_1.CalabashController.JumpToCalabashCollectTabView(
								this.Lvt.PhantomItem.MonsterId,
							)
						: ((t =
								ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinMonsterIdMapByMonsterId(
									this.Lvt.PhantomItem.MonsterId,
								)),
							CalabashController_1.CalabashController.JumpToCalabashCollectTabView(
								t,
							));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UIButtonComponent],
			[3, UE.UIHorizontalLayout],
			[4, UE.UIText],
			[5, UE.UIItem],
			[6, UE.UIText],
			[8, UE.UIItem],
			[9, UE.UIText],
		]),
			(this.BtnBindInfo = [[2, this.Uvt]]);
	}
	OnBeforeCreate() {
		(this.KHi = this.OpenParam),
			(this.Lvt =
				ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
					this.KHi.MonsterItemId,
				));
	}
	OnStart() {
		(this.eGe = new GenericLayout_1.GenericLayout(
			this.GetHorizontalLayout(3),
			this.sGe,
		)),
			(this.Xgt = new SmallItemGrid_1.SmallItemGrid()),
			this.Xgt.Initialize(this.GetItem(1).GetOwner()),
			this.GetText(4).SetUIActive(
				!GameModeController_1.GameModeController.IsInInstance(),
			),
			this.GetButton(2).RootUIComp.SetRaycastTarget(
				!GameModeController_1.GameModeController.IsInInstance(),
			),
			this.O8s();
	}
	OnBeforeShow() {
		this.Og();
	}
	Refresh() {
		(this.KHi =
			ModelManager_1.ModelManager.PhantomBattleModel.QualityUnlockTipsList.shift()),
			(this.Lvt =
				ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
					this.KHi.MonsterItemId,
				)),
			this.Og();
	}
	O8s() {
		this.GetText(0)?.SetUIActive(!1), this.GetText(9)?.SetUIActive(!1);
	}
	Og() {
		this.O8s(), this.N8s()?.SetUIActive(!0);
		var t =
			ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
				this.Lvt.PhantomItem.MonsterId,
			);
		(t = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(
			t.MonsterInfoId,
		)),
			(this.Tvt = ConfigManager_1.ConfigManager.CalabashConfig.MaxTipCd),
			this.N8s().ShowTextNew(t.Name),
			(t = {
				Data: this.Lvt.PhantomItem.ItemId,
				Type: 4,
				ItemConfigId: this.Lvt.PhantomItem.ItemId,
				IconPath: t.Icon,
			});
		this.Xgt.Apply(t),
			this.aqe(),
			this.Pvt(),
			this.C6s(),
			this.k8s(),
			this.F8s();
	}
	N8s() {
		var t = 0 === this.KHi.SkinId ? 0 : 9;
		return this.GetText(t);
	}
	F8s() {
		var t = 0 === this.KHi.SkinId;
		this.GetItem(7)?.SetUIActive(t);
	}
	k8s() {
		var t = 0 !== this.KHi.SkinId;
		this.GetItem(8)?.SetUIActive(t);
	}
	Pvt() {
		var t;
		0 === this.KHi.SkinId &&
			((t = this.KHi.UnlockQuality),
			(t =
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(
					t,
				).DropColor),
			this.N8s().SetColor(UE.Color.FromHex(t)));
	}
	aqe() {
		var t = 0 === this.KHi.SkinId,
			e =
				(this.eGe?.SetActive(t),
				this.GetItem(5)?.SetUIActive(t),
				this.KHi.UnlockQuality),
			i = new Array();
		for (let t = 0; t < e - 1; t++) i.push(t);
		this.eGe?.RefreshByData(i);
	}
	C6s() {
		var t =
			0 === this.KHi.SkinId ? "UnLockNewVisionQuality" : "UnLockNewVisionSkin";
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t);
	}
	CloseViewOrShowNextData() {
		0 <
		ModelManager_1.ModelManager.PhantomBattleModel.QualityUnlockTipsList.length
			? (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Calabash", 28, "刷新下个声骸数据"),
				this.Refresh(),
				this.UiViewSequence?.PlaySequence("Start"))
			: this.CloseMe();
	}
	OnTick(t) {
		this.Tvt <= 0 ||
			((this.Tvt -= t), this.Tvt <= 0 && this.CloseViewOrShowNextData());
	}
}
exports.VisionNewQualityView = VisionNewQualityView;
class QualityStarItem extends GridProxyAbstract_1.GridProxyAbstract {
	Refresh(t, e, i) {}
}
