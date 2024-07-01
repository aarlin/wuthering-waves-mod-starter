"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GachaResultView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	ShareRewardById_1 = require("../../../../Core/Define/ConfigQuery/ShareRewardById"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ChannelController_1 = require("../../Channel/ChannelController"),
	CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
	ShareRewardInfo_1 = require("../../Photograph/View/ShareRewardInfo"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GachaSceneView_1 = require("../GachaUiSceneManager/GachaSceneView"),
	GachaMultipleResultItem_1 = require("./GachaMultipleResultItem"),
	GachaResultItemNew_1 = require("./GachaResultItemNew"),
	CameraController_1 = require("../../../Camera/CameraController");
class GachaResultView extends GachaSceneView_1.GachaSceneView {
	constructor() {
		super(...arguments),
			(this.wjt = !1),
			(this.Bjt = void 0),
			(this.bjt = void 0),
			(this.qjt = void 0),
			(this.Gjt = void 0),
			(this.Njt = void 0),
			(this.Ojt = () => {
				if (ChannelController_1.ChannelController.CouldShare()) {
					let a = 0;
					if (
						1 ===
						(e = ModelManager_1.ModelManager.GachaModel.CurGachaResult).length
					) {
						if (this.GetItemQuality(e[0].u5n.G3n) < 5) return;
						a =
							2 ===
							ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(
								e[0].u5n.G3n,
							)
								? 4
								: 3;
					} else a = 5;
					this.GetButton(6).RootUIComp.SetUIActive(!0);
					var e = ShareRewardById_1.configShareRewardById.GetConfig(a),
						t = ModelManager_1.ModelManager.ChannelModel.CouldGetShareReward(a);
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Gacha", 28, "刷新分享按钮", ["showShareReward", t]),
						this.GetItem(7).SetUIActive(t),
						t &&
							((t = [...e.ShareReward][0]), this.Njt?.SetItemInfo(t[0], t[1]));
				}
			}),
			(this.kjt = () => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.CloseGachaSceneView,
				);
			}),
			(this.Fjt = () => {
				ChannelController_1.ChannelController.ShareGacha(
					ModelManager_1.ModelManager.GachaModel.CurGachaResult,
				);
			}),
			(this.Vjt = (e, t) => {
				(e = e[0].ItemId), (t = t[0].ItemId);
				var a =
						ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
							e,
						)?.QualityId,
					n =
						ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
							t,
						)?.QualityId;
				return a === n ? e - t : n - a;
			}),
			(this.Hjt = () => new GachaResultItemNew_1.GachaResultItemNew()),
			(this.jjt = () =>
				new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[4, UE.UIButtonComponent],
			[1, UE.UIGridLayout],
			[5, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIGridLayout],
			[6, UE.UIButtonComponent],
			[7, UE.UIItem],
			[8, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[4, this.kjt],
				[6, this.Fjt],
			]);
	}
	OnAfterInitComponentsData() {
		var e = this.OpenParam;
		this.wjt = e?.ResultViewHideExtraReward;
	}
	async OnBeforeStartAsync() {
		var e,
			t = ModelManager_1.ModelManager.GachaModel.CurGachaResult;
		t &&
			0 !== t.length &&
			((this.qjt = new GenericLayout_1.GenericLayout(
				this.GetGridLayout(1),
				this.jjt,
			)),
			(this.Gjt = new GenericLayout_1.GenericLayout(
				this.GetGridLayout(3),
				this.jjt,
			)),
			(this.Njt = new ShareRewardInfo_1.ShareRewardInfo()),
			(e = [this.Njt.OnlyCreateByActorAsync(this.GetItem(8).GetOwner())]),
			1 === t.length
				? e.push(this.Wjt(t[0]))
				: e.push(this.HandleMultiGacha(t)),
			await Promise.all(e),
			this.AddChild(this.Njt),
			this.GetButton(6)?.RootUIComp.SetUIActive(!1),
			this.GetItem(7)?.SetUIActive(!1),
			CameraController_1.CameraController.ResetViewTarget());
	}
	OnBeforeShow() {
		this.Ojt();
	}
	AfterAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnFirstShare,
			this.Ojt,
		);
	}
	AfterRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnFirstShare,
			this.Ojt,
		);
	}
	Kjt(e) {
		e && 0 < e.length && !this.wjt
			? (this.GetItem(0).SetUIActive(!0), this.qjt.RefreshByData(e))
			: this.GetItem(0).SetUIActive(!1);
	}
	Qjt(e) {
		e && 0 < e.length && !this.wjt
			? (this.GetItem(2).SetUIActive(!0), this.Gjt.RefreshByData(e))
			: this.GetItem(2).SetUIActive(!1);
	}
	async HandleMultiGacha(e) {
		var t = new GachaMultipleResultItem_1.GachaMultipleResultItem(),
			a =
				((t =
					(await t.CreateThenShowByResourceIdAsync(
						"UiItem_MultiGacha",
						this.GetItem(5),
					),
					t.GetGachaResultItemLayout())),
				(this.bjt = new GenericLayout_1.GenericLayout(t, this.Hjt)),
				new Map()),
			n = new Map();
		for (const t of e) {
			t.p5n && this.Xjt(t.p5n, a);
			var i = t.M5n;
			i && 0 < i.G3n && 0 < i.g5n && this.$jt(i, n);
		}
		(t = this.Yjt(a)), this.Kjt(t), (t = this.Yjt(n)), this.Qjt(t);
		const r = (e) => {
			switch (e) {
				case 1:
					return 2;
				case 2:
					return 1;
				default:
					return 0;
			}
		};
		(t = [...e]).sort((e, t) => {
			var a =
					ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
						e.u5n.G3n,
					)?.QualityId ?? 0,
				n =
					ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
						t.u5n.G3n,
					)?.QualityId ?? 0;
			return a === n
				? ((e = r(
						ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(e.u5n.G3n),
					)),
					r(
						ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(t.u5n.G3n),
					) - e)
				: n - a;
		}),
			await this.bjt.RefreshByDataAsync(t);
	}
	async Wjt(e) {
		var t = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
				"UiItem_SingleGacha",
				this.GetItem(5),
			),
			a =
				((t =
					((this.Bjt = new GachaResultItemNew_1.GachaResultItemNew()),
					await this.Bjt.CreateThenShowByActorAsync(t),
					this.Bjt.Update(e),
					new Map())),
				new Map());
		(e = (e.p5n && this.Xjt(e.p5n, t), e.M5n)) &&
			0 < e.G3n &&
			0 < e.g5n &&
			this.$jt(e, a),
			(e = this.Yjt(t)),
			this.Kjt(e),
			(t = this.Yjt(a));
		this.Qjt(t);
	}
	Xjt(e, t) {
		for (const a of e) this.$jt(a, t);
	}
	$jt(e, t) {
		t.set(e.G3n, (e.g5n ?? 0) + (t.get(e.G3n) ?? 0));
	}
	Yjt(e) {
		if (e && 0 !== e.size) {
			const t = new Array();
			return (
				e.forEach((e, a) => {
					(a = [{ IncId: 0, ItemId: a }, e]), t.push(a);
				}),
				t.sort(this.Vjt),
				t
			);
		}
	}
	GetItemQuality(e) {
		let t = 0;
		switch (ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(e)) {
			case 1:
				t =
					ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(
						e,
					).QualityId;
				break;
			case 2:
				t =
					ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
						e,
					)?.QualityId;
		}
		return t;
	}
}
exports.GachaResultView = GachaResultView;
