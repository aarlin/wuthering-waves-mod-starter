"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UseBuffItemView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	NumberSelectComponent_1 = require("../../Common/NumberSelect/NumberSelectComponent"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	BuffItemControl_1 = require("../BuffItemControl"),
	BuffTargetRoleItem_1 = require("./BuffTargetRoleItem"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class UseBuffItemView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.h0t = []),
			(this.l0t = void 0),
			(this._0t = void 0),
			(this.WGe = void 0),
			(this.u0t = void 0),
			(this.c0t = () => {
				if (this._0t) {
					var e = this._0t.UseItemConfigId;
					if (
						0 <
						ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(e)
					)
						ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"UseBuffCdText",
						);
					else {
						if (this._0t.CurrentAttribute <= 0) {
							if (
								!ConfigManager_1.ConfigManager.BuffItemConfig.IsResurrectionItem(
									e,
								)
							)
								return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
									"UseBuffToDeadRole",
								);
						} else if (
							ConfigManager_1.ConfigManager.BuffItemConfig.IsResurrectionItem(e)
						)
							return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
								"UseBuffToAliveRole",
							);
						e = this._0t.CurrentAttribute;
						var t = this._0t.GetAddAttribute(),
							i = this._0t.MaxAttribute;
						i < e + t
							? ((t = this._0t.RoleName),
								(i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
									i <= e ? 37 : 170,
								)).SetTextArgs(t),
								i.FunctionMap.set(2, () => {
									this.UiViewSequence.StopSequenceByKey("Popup"),
										this.UiViewSequence.SequencePlayReverseByKey("Popup", !1),
										this.m0t();
								}),
								i.FunctionMap.set(1, () => {
									this.UiViewSequence.StopSequenceByKey("Popup"),
										this.UiViewSequence.SequencePlayReverseByKey("Popup", !1);
								}),
								(i.IsEscViewTriggerCallBack = !1),
								ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
									i,
								),
								this.UiViewSequence.StopSequenceByKey("Popup"),
								this.UiViewSequence.PlaySequence("Popup"))
							: this.m0t();
					}
				} else this.d0t();
			}),
			(this.C0t = () => {
				this.d0t();
			}),
			(this.KGe = (e) => {
				var t =
					ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
						"ItemUseCount",
					);
				return new LguiUtil_1.TableTextArgNew(t, e);
			}),
			(this.QGe = (e) => {
				this._0t.SetUseItemCount(e), this.g0t();
			}),
			(this.f0t = (e, t) => {
				this.l0t && this.p0t();
			}),
			(this.v0t = (e) => {
				this.M0t(e);
			}),
			(this.S0t = () => {
				this.p0t();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIButtonComponent],
			[5, UE.UIButtonComponent],
			[6, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[4, this.c0t],
				[5, this.C0t],
			]);
	}
	E0t(e) {
		this.y0t(), this.I0t();
		var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		let i = !1;
		for (const e of this.h0t) {
			var o = e.GetUseBuffItemRoleData();
			if (o && o.GetEntityId() === t.Id) {
				this.M0t(e), (i = !0);
				break;
			}
		}
		i || this.M0t(this.h0t[0]);
	}
	T0t() {
		var e = this._0t.UseItemConfigId;
		return ConfigManager_1.ConfigManager.BuffItemConfig.IsResurrectionItem(e) ||
			((e =
				ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffItemTotalCdTime(
					e,
				)) &&
				0 < e)
			? 1
			: this._0t.GetUseItemMaxCount();
	}
	rNe() {
		(this.WGe = new NumberSelectComponent_1.NumberSelectComponent(
			this.GetItem(6),
		)),
			(this.u0t = {
				MaxNumber: this.T0t(),
				GetExchangeTableText: this.KGe,
				ValueChangeFunction: this.QGe,
			}),
			this.WGe.Init(this.u0t);
	}
	OnStart() {
		var e = this.OpenParam;
		void 0 !== e && (this.E0t(e), this.rNe());
	}
	OnBeforeDestroy() {
		this.ResetUseBuffItemView(),
			this.WGe.Destroy(),
			(this.u0t = void 0),
			(this.WGe = void 0),
			ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnUseBuffItem,
			this.f0t,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnUseBuffItem,
			this.f0t,
		);
	}
	OnTick(e) {
		for (const t of this.h0t) t.Tick(e);
	}
	d0t() {
		UiManager_1.UiManager.CloseView("UseBuffItemView");
	}
	ResetUseBuffItemView() {
		for (const e of this.h0t) e.ResetBuffTargetRoleItem();
		(this.h0t.length = 0),
			(this._0t = void 0),
			(this.l0t = void 0),
			ModelManager_1.ModelManager.BuffItemModel.ClearAllUseBuffItemRoleData();
	}
	y0t() {
		for (const i of [this.GetItem(1), this.GetItem(2), this.GetItem(3)]) {
			var e = i.GetOwner(),
				t = new BuffTargetRoleItem_1.BuffTargetRoleItem();
			t.Initialize(e),
				t.BindOnClickedBuffTargetRoleItem(this.v0t),
				t.BindOnUseItemAnimationFinished(this.S0t),
				this.h0t.push(t);
		}
	}
	M0t(e) {
		var t = e.GetUseBuffItemRoleData();
		t
			? e.IsSelected() ||
				(e.SetSelected(!0),
				this._0t && this._0t.SetUseItemCount(0),
				this.l0t && this.l0t.SetSelected(!1),
				(this._0t = t),
				(this.l0t = e),
				t.SetUseItemCount(1),
				this.g0t(),
				this.L0t(),
				this.u0t && this.WGe?.Init(this.u0t))
			: ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
					"NoneRole",
				);
	}
	p0t() {
		var e = ModelManager_1.ModelManager.InventoryModel,
			t = this._0t.UseItemConfigId;
		e.GetItemCountByConfigId(t) < 1
			? this.d0t()
			: ((e = this.T0t()), this.WGe.SetLimitMaxValue(e), this.WGe.Refresh(e));
	}
	I0t() {
		var e = ModelManager_1.ModelManager.BuffItemModel.GetAllUseBuffItemRole();
		for (const e of this.h0t) e.SetActive(!1);
		let t = 0;
		for (let n = 0; n < this.h0t.length; n++) {
			var i = n + 1,
				o = ((i = e.get(i)), this.h0t[t]);
			i
				? (o.RefreshBuffTargetRoleItem(i), o.SetActive(!0), t++)
				: o.RemoveRole();
		}
	}
	g0t() {
		var e, t, i;
		this._0t &&
			this.l0t &&
			((e = this._0t.CurrentAttribute),
			(t = this._0t.MaxAttribute),
			(i = this._0t.GetAddAttribute()),
			this.l0t.RefreshPreviewUseItem(e, t, i));
	}
	L0t() {
		var e, t;
		this._0t &&
			((e = this._0t.RoleName),
			(t = this.GetText(0)),
			LguiUtil_1.LguiUtil.SetLocalText(t, "UseBuffTitle", e));
	}
	m0t() {
		var e, t, i;
		this._0t
			? ((e = this._0t.UseItemConfigId),
				(t = this._0t.UseItemCount),
				(i = this._0t.RoleConfigId),
				BuffItemControl_1.BuffItemControl.RequestUseBuffItem(e, t, i))
			: this.d0t();
	}
}
exports.UseBuffItemView = UseBuffItemView;
