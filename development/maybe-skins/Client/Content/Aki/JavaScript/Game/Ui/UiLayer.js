"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiLayer = exports.EInitState = void 0);
const UE = require("ue"),
	Info_1 = require("../../Core/Common/Info"),
	Log_1 = require("../../Core/Common/Log"),
	StringUtils_1 = require("../../Core/Utils/StringUtils"),
	LguiUtil_1 = require("../Module/Util/LguiUtil"),
	EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	GlobalData_1 = require("../GlobalData"),
	ModelManager_1 = require("../Manager/ModelManager"),
	UiLayerType_1 = require("./Define/UiLayerType"),
	Macro_1 = require("../../Core/Preprocessor/Macro");
var EInitState;
!(function (e) {
	(e[(e.None = 0)] = "None"),
		(e[(e.Initializing = 1)] = "Initializing"),
		(e[(e.Inited = 2)] = "Inited");
})((EInitState = exports.EInitState || (exports.EInitState = {})));
class UiLayer {
	static get UiRoot() {
		return this.pdr;
	}
	static get UiRootItem() {
		return this.vdr;
	}
	static get WorldSpaceUiRoot() {
		return this.Mdr;
	}
	static get WorldSpaceUiRootItem() {
		return this.Sdr;
	}
	static async Edr(e) {
		if (this.ydr.has(e) && 0 < (t = this.ydr.get(e)).length && void 0 !== t[0])
			return;
		var t = [],
			i = this.GetLayerRootUiItem(e);
		await this.Idr(0, i, t), this.ydr.set(e, t);
	}
	static async Idr(e, t, i) {
		var r = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
				"UiItem_BattleViewUnitNode_Prefab",
				t,
			),
			a = (LguiUtil_1.LguiUtil.SetActorIsPermanent(r, !0, !1), r.RootComponent);
		(a =
			(i.push(a),
			Info_1.Info.IsPlayInEditor &&
				(r.SetActorLabel((r = "Unit_" + e)), a.SetDisplayName(r)),
			e + 1)) !== UiLayerType_1.TIP_LAYER_UNIT_COUNT &&
			(await this.Idr(a, t, i));
	}
	static GetFloatUnit(e, t) {
		if ((e = this.ydr.get(e)))
			return t >= e.length
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							11,
							"索引大于生成单元节点列表,返回当前最大值节点",
						),
					e[e.length])
				: e[t];
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"UiCore",
				11,
				"索引大于生成单元节点列表,返回当前最大值节点",
			);
	}
	static GetLayerRootUiItem(e) {
		var t = this.Tdr.get(e);
		if (t) return t;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"UiCore",
				11,
				"找不到对应的UiLayer, 此时UiLayer可能还未初始化",
				["层级名称", UiLayerType_1.ELayerType[e]],
			);
	}
	static GetBattleViewUnit(e) {
		return this.Ldr[e];
	}
	static SetLayerActive(e, t) {
		var i = this.GetLayerRootUiItem(e);
		i
			? (i.SetUIActive(t),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"UiLayer",
						11,
						"有操作设置层级的显隐状态",
						["层级类型", e],
						["显示状态", t],
					))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("UiLayer", 11, "找不到对应的uiLayer：", ["type", e]);
	}
	static async Initialize() {
		UiLayer.ZCe ||
			((UiLayer.ZCe = !0),
			await Promise.all([this.Ddr(), this.Rdr()]),
			await this.Udr(),
			await Promise.all([
				this.Adr(),
				this.Edr(UiLayerType_1.ELayerType.BattleFloat),
				this.Edr(UiLayerType_1.ELayerType.Float),
			]));
	}
	static async Ddr() {
		this.pdr
			? Log_1.Log.CheckInfo() && Log_1.Log.Info("UiCore", 1, "界面根节点已存在")
			: ((this.pdr = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
					"UiItem_Root_Prefab",
					void 0,
				)),
				this.pdr &&
				((this.vdr = this.pdr.GetComponentByClass(UE.UIItem.StaticClass())),
				this.vdr)
					? (this.pdr.OnDestroyed.Add(() => {
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("UiCore", 1, "UiRoot被销毁"),
								this.Tdr.clear(),
								(this.pdr = void 0),
								(this.vdr = void 0);
						}),
						LguiUtil_1.LguiUtil.SetActorIsPermanent(this.UiRoot, !0, !1))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("UiCore", 1, "界面根节点创建失败", [
							"UI_ROOT_PATH",
							"UiItem_Root_Prefab",
						]));
	}
	static async Udr() {
		var e = [];
		for (const t of UiLayerType_1.LayerTypeEnumValues) e.push(this.Pdr(t));
		await Promise.all(e).then(() => {
			let e = 0;
			for (const t of UiLayerType_1.LayerTypeEnumValues)
				(UE.KuroStaticLibrary.IsBuildShipping() &&
					t === UiLayerType_1.ELayerType.Debug) ||
					this.GetLayerRootUiItem(t).SetHierarchyIndex(++e);
		});
	}
	static async Pdr(e) {
		if (this.Tdr.has(e))
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("UiLayer", 17, "重复加载UI层级", [
					"层级类型",
					UiLayerType_1.ELayerType[e],
				]);
		else if (
			!UE.KuroStaticLibrary.IsBuildShipping() ||
			e !== UiLayerType_1.ELayerType.Debug
		) {
			let i = "UiItem_Layer_Prefab";
			switch (e) {
				case UiLayerType_1.ELayerType.HUD:
					i = "UiItem_LayerHud_Prefab";
					break;
				case UiLayerType_1.ELayerType.Mask:
				case UiLayerType_1.ELayerType.NormalMask:
					i = "UiItem_LayerMask_Prefab";
			}
			var t = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
				i,
				this.vdr,
			);
			LguiUtil_1.LguiUtil.SetActorIsPermanent(t, !0, !1),
				this.Tdr.set(e, t.RootComponent),
				e === UiLayerType_1.ELayerType.Pool && t.RootComponent.SetUIActive(!1);
		}
	}
	static async Adr() {
		if (!this.Ldr) {
			var e = UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.HUD),
				t = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
					"UiItem_BattleViewUnitNode_Prefab",
					e,
				);
			let a = t;
			this.Ldr = [];
			for (let o = 0; o < UiLayerType_1.BATTLE_VIEW_UNIT_COUNT; o++) {
				(a = a || LguiUtil_1.LguiUtil.DuplicateActor(t, e)),
					LguiUtil_1.LguiUtil.SetActorIsPermanent(a, !0, !1);
				var i,
					r = a.RootComponent;
				Info_1.Info.IsPlayInEditor &&
					((i = "Unit_" + o), a.SetActorLabel(i), r.SetDisplayName(i)),
					this.Ldr.push(r),
					(a = void 0);
			}
		}
	}
	static async Rdr() {
		this.Mdr
			? Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("UiCore", 1, "空间界面根节点已存在")
			: ((this.Mdr = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
					"UiItem_WorldSpace_Prefab",
					void 0,
				)),
				this.Mdr &&
				((this.Sdr = this.Mdr.GetComponentByClass(UE.UIItem.StaticClass())),
				this.Mdr)
					? (this.Mdr.OnDestroyed.Add(() => {
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("UiCore", 1, "WorldSpaceUiRoot被销毁"),
								(this.Mdr = void 0),
								(this.Sdr = void 0);
						}),
						LguiUtil_1.LguiUtil.SetActorIsPermanent(
							this.WorldSpaceUiRoot,
							!0,
							!1,
						))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("UiCore", 1, "空间界面根节点创建失败", [
							"WORLD_SPACE_UI_ROOT",
							"UiItem_WorldSpace_Prefab",
						]));
	}
	static SetUiRootActive(e) {
		var t;
		this.IsForceHideUi() ||
			((t = UiLayer.vdr) &&
				UE.KismetSystemLibrary.IsValid(t) &&
				(t.SetUIActive(e),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnUiScreenRootVisibleChange,
					e,
				)));
	}
	static IsUiActive() {
		var e = UiLayer.vdr;
		return (
			!(!e || !UE.KismetSystemLibrary.IsValid(e)) && e.IsUIActiveInHierarchy()
		);
	}
	static ForceHideUi() {
		ModelManager_1.ModelManager.SundryModel.GmBlueprintGmIsOpen &&
			(this.SetUiRootActive(!1), this.SetWorldUiActive(!1), (this.xdr = !0));
	}
	static ForceShowUi() {
		this.IsForceHideUi() &&
			((this.xdr = !1), this.SetUiRootActive(!0), this.SetWorldUiActive(!0));
	}
	static IsForceHideUi() {
		return this.xdr;
	}
	static SetForceHideUiState(e) {
		this.xdr = !e;
	}
	static SetWorldUiActive(e) {
		var t;
		this.IsForceHideUi() ||
			((t = UiLayer.Sdr) &&
				UE.KismetSystemLibrary.IsValid(t) &&
				t.SetUIActive(e));
	}
	static SetShowMaskLayer(e, t) {
		var i,
			r = UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Mask);
		r &&
			(t ? UiLayer.wdr.add(e) : UiLayer.wdr.delete(e),
			(i = UiLayer.wdr.size),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"UiCore",
					17,
					"Mask遮罩",
					["tag", e],
					["show", t],
					["size", i],
				),
			r?.SetRaycastTarget(0 < i));
	}
	static IsInMask() {
		var e = UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Mask);
		return !!e && e.IsRaycastTarget();
	}
	static SetShowNormalMaskLayer(e, t = "") {
		var i;
		(StringUtils_1.StringUtils.IsEmpty(this.Bdr) || (this.Bdr === t && !e)) &&
			(i = UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.NormalMask)) &&
			(i?.SetRaycastTarget(e),
			e && StringUtils_1.StringUtils.IsEmpty(this.Bdr) && t
				? (this.Bdr = t)
				: e || t !== this.Bdr || (this.Bdr = ""),
			Log_1.Log.CheckDebug()) &&
			Log_1.Log.Debug(
				"UiCore",
				17,
				"设置Normal层点击遮罩",
				["是否显示", e],
				["上次来源", this.Bdr],
				["当前来源", t],
			);
	}
}
((exports.UiLayer = UiLayer).ZCe = !1),
	(UiLayer.Bdr = ""),
	(UiLayer.pdr = void 0),
	(UiLayer.vdr = void 0),
	(UiLayer.Mdr = void 0),
	(UiLayer.Sdr = void 0),
	(UiLayer.Ldr = void 0),
	(UiLayer.Tdr = new Map()),
	(UiLayer.wdr = new Set()),
	(UiLayer.ydr = new Map());
