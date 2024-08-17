"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GachaSelectionView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
	GachaController_1 = require("../GachaController"),
	GachaDefine_1 = require("../GachaDefine"),
	GachaSelectionItem_1 = require("./GachaSelectionItem");
class GachaSelectionView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.JHt = void 0),
			(this.zHt = void 0),
			(this.ZHt = void 0),
			(this.ejt = void 0),
			(this.tjt = () => {
				GachaController_1.GachaController.GachaUsePoolRequest(
					this.JHt.Id,
					this.ijt,
				),
					UiManager_1.UiManager.CloseView("GachaSelectionView");
			}),
			(this.ojt = (e) => {
				(this.JHt = e), this.rjt();
			}),
			(this.njt = () => {
				var e = new GachaSelectionItem_1.GachaSelectionItem();
				return (e.ToggleCallBack = this.sjt), (e.CanToggleChange = this.Eft), e;
			}),
			(this.sjt = (e) => {
				this.zHt?.GetGenericLayout()?.SelectGridProxy(e), this.ajt();
			}),
			(this.Eft = (e) =>
				e !== this.zHt?.GetGenericLayout()?.GetSelectedGridIndex());
	}
	get ijt() {
		var e = this.zHt.GetGenericLayout().GetSelectedGridIndex();
		return !this.ZHt || e < 0 || e >= this.ZHt.length
			? 0
			: this.ZHt[e].PoolInfo.Id;
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIScrollViewWithScrollbarComponent],
			[3, UE.UIItem],
			[4, UE.UIText],
			[5, UE.UIButtonComponent],
			[6, UE.UIText],
		]),
			(this.BtnBindInfo = [[5, this.tjt]]);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.GachaSelectionViewRefresh,
			this.ojt,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.GachaSelectionViewRefresh,
			this.ojt,
		);
	}
	async OnBeforeStartAsync() {
		(this.zHt = new GenericScrollViewNew_1.GenericScrollViewNew(
			this.GetScrollViewWithScrollbar(2),
			this.njt,
		)),
			(this.ejt = new SmallItemGrid_1.SmallItemGrid()),
			await this.ejt.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()),
			(this.JHt = this.OpenParam.GachaInfo),
			this.rjt();
	}
	_jt() {
		if (this.JHt) {
			var e = this.JHt.GetValidPoolList();
			if (e) {
				var t = new Array(e.length);
				for (let a = 0; a < e.length; a++) {
					var i = new GachaDefine_1.GachaPoolData(this.JHt, e[a]);
					t[a] = i;
				}
				return t;
			}
		}
	}
	ljt() {
		var e = this.JHt.GetValidPoolList();
		return !(!e || !this.ZHt) && e.length === this.ZHt.length;
	}
	rjt() {
		if (
			this.zHt &&
			((this.ZHt = this._jt()), this.ZHt) &&
			0 !== this.ZHt.length
		) {
			const e = this.ijt;
			this.zHt.RefreshByData(this.ZHt, () => {
				if (this.ljt()) {
					const t = 0 < e ? e : this.JHt.UsePoolId;
					let i = 0;
					0 < t &&
						(i = this.ZHt.findIndex((e) => e.PoolInfo.Id === t)) < 0 &&
						(i = 0),
						this.zHt.GetGenericLayout().SelectGridProxy(i),
						this.ajt();
				} else this.rjt();
			});
		}
	}
	ajt() {
		var e = this.zHt.GetGenericLayout().GetSelectedGridIndex(),
			t =
				((e = this.ZHt[e].PoolInfo.Id),
				(i = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(e))
					.ShowIdList[0]),
			i = i.Type,
			a = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewTypeConfig(i);
		(a =
			(LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), a.OptionalTitle),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), a.OptionalDesc),
			ModelManager_1.ModelManager.GachaModel.IsRolePool(i)))
			? ((i = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(t)),
				LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.Name),
				this.ejt.Apply({ Data: void 0, Type: 2, ItemConfigId: t }))
			: ((a =
					ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(t)),
				LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), a.WeaponName),
				this.ejt.Apply({ Data: void 0, Type: 4, ItemConfigId: t })),
			(i = this.JHt.UsePoolId),
			(t = (a = i === e)
				? "Text_GachaOptionalText1_Text"
				: "Text_GachaOptionalText2_Text");
		this.GetButton(5)?.SetSelfInteractive(!a),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t);
	}
}
exports.GachaSelectionView = GachaSelectionView;
