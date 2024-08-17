"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, o, n) {
		var r,
			i = arguments.length,
			a =
				i < 3
					? t
					: null === n
						? (n = Object.getOwnPropertyDescriptor(t, o))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			a = Reflect.decorate(e, t, o, n);
		else
			for (var s = e.length - 1; 0 <= s; s--)
				(r = e[s]) && (a = (i < 3 ? r(a) : 3 < i ? r(t, o, a) : r(t, o)) || a);
		return 3 < i && a && Object.defineProperty(t, o, a), a;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiRoleWeaponComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	ModelUtil_1 = require("../../../../../Core/Utils/ModelUtil"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	SkeletalObserverManager_1 = require("../../../SkeletalObserver/SkeletalObserverManager"),
	UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
	UiModelUtil_1 = require("../../UiModelUtil"),
	UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiRoleWeaponComponent = class extends UiModelComponentBase_1.UiModelComponentBase {
	constructor() {
		super(...arguments),
			(this.Qwr = void 0),
			(this.GBr = void 0),
			(this.nXt = void 0),
			(this.SBr = void 0),
			(this.QBr = void 0),
			(this.XBr = new Array()),
			(this.$Br = 0),
			(this.YBr = new Array()),
			(this.JBr = new Array()),
			(this.Jwr = (e) => {
				this.SetDitherEffect(e);
			}),
			(this.OnRoleIdChange = () => {
				this.RefreshWeaponCase(), this.HideAllWeapon();
				var e = this.GBr.RoleDataId,
					t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
				t &&
					(t.IsTrialRole()
						? ((t =
								ModelManager_1.ModelManager.RoleModel.GetRoleRobotData(
									e,
								).GetWeaponData()),
							this.SetWeaponByWeaponData(t))
						: ((t =
								ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(
									e,
								)),
							this.SetWeaponByWeaponData(t)));
			}),
			(this.OnRoleMeshLoadComplete = () => {
				this.zBr();
			}),
			(this.OnAnsBegin = (e) => {
				var t = e.Index;
				this.ShowWeaponByIndex(t, e.ShowMaterialController),
					e.Transform && this.SetWeaponTransformByIndex(t, e.Transform);
			}),
			(this.OnAnsEnd = (e) => {
				this.HideWeaponByIndex(e.Index, e.HideEffect);
			});
	}
	OnInit() {
		(this.GBr = this.Owner.CheckGetComponent(11)),
			(this.Qwr = this.Owner.CheckGetComponent(0)),
			(this.nXt = this.Owner.CheckGetComponent(1)),
			(this.SBr = this.Owner.CheckGetComponent(6));
	}
	OnStart() {
		EventSystem_1.EventSystem.AddWithTarget(
			this.Owner,
			EventDefine_1.EEventName.OnUiModelLoadComplete,
			this.OnRoleMeshLoadComplete,
		),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Owner,
				EventDefine_1.EEventName.OnUiModelRoleDataIdChange,
				this.OnRoleIdChange,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Owner,
				EventDefine_1.EEventName.OnUiModelSetDitherEffect,
				this.Jwr,
			),
			this.SBr?.RegisterAnsTrigger(
				"UiWeaponAnsContext",
				this.OnAnsBegin,
				this.OnAnsEnd,
			);
	}
	OnEnd() {
		EventSystem_1.EventSystem.RemoveWithTarget(
			this.Owner,
			EventDefine_1.EEventName.OnUiModelLoadComplete,
			this.OnRoleMeshLoadComplete,
		),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Owner,
				EventDefine_1.EEventName.OnUiModelRoleDataIdChange,
				this.OnRoleIdChange,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Owner,
				EventDefine_1.EEventName.OnUiModelSetDitherEffect,
				this.Jwr,
			);
		for (const e of this.XBr)
			SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
				e,
			);
	}
	Refresh() {
		var e = this.QBr.GetItemConfig().Models;
		this.$Br = e.length;
		for (let e = this.XBr.length; e < this.$Br; e++) {
			var t =
				SkeletalObserverManager_1.SkeletalObserverManager.NewSkeletalObserver(
					2,
				);
			this.XBr.push(t), this.JBr.push(0), this.HideWeaponByIndex(e);
		}
		for (let t = 0; t < this.$Br; t++) {
			var o = this.XBr[t].Model;
			o.CheckGetComponent(18)?.SetWeaponData(this.QBr),
				o.CheckGetComponent(2)?.LoadModelByModelId(e[t]);
		}
	}
	ShowAllWeapon(e = !1) {
		for (let t = 0; t < this.XBr.length; t++) this.ShowWeaponByIndex(t, e);
	}
	HideAllWeapon(e = !1) {
		for (let t = 0; t < this.XBr.length; t++) this.HideWeaponByIndex(t, e);
	}
	ShowWeaponByIndex(e, t = !1) {
		var o, n;
		e < 0 || e >= this.XBr.length
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("Weapon", 44, "显示武器索引错误", ["index", e])
			: (n = (o = this.XBr[e].Model).CheckGetComponent(0))?.GetVisible() ||
				((this.JBr[e] = 2),
				n?.SetVisible(!0),
				t &&
					UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
						o,
						"ChangeWeaponMaterialController",
					));
	}
	HideWeaponByIndex(e, t = !1) {
		var o, n;
		e < 0 || e >= this.XBr.length
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("Weapon", 44, "隐藏武器索引错误", ["index", e])
			: (n = (o = this.XBr[e].Model).CheckGetComponent(0))?.GetVisible() &&
				((this.JBr[e] = 1), n?.SetVisible(!1), t) &&
				UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(o, "ShowHideWeaponEffect");
	}
	RefreshWeaponCase() {
		var e = this.GBr.RoleConfigId;
		e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
		if ((e = ModelUtil_1.ModelUtil.GetModelConfig(e.UiMeshId))) {
			var t = e.BattleSockets;
			for (let e = (this.YBr.length = 0); e < t.Num(); e++) {
				var o = t.Get(e);
				this.YBr.push(o);
			}
		}
	}
	RefreshWeaponDa() {
		var e = this.QBr.GetBreachLevel();
		for (const t of this.XBr)
			t.Model?.CheckGetComponent(19)?.RefreshWeaponBreachDa(e);
	}
	zBr() {
		if (2 === this.Qwr.GetModelLoadState()) {
			var e = this.nXt.MainMeshComponent;
			for (let n = 0; n < this.$Br; n++) {
				var t = this.XBr[n],
					o = FNameUtil_1.FNameUtil.GetDynamicFName(this.YBr[n]);
				t = t.Model?.CheckGetComponent(1);
				t?.Actor?.K2_AttachToComponent(e, o, 0, 0, 0, !1),
					t?.Actor?.K2_SetActorRelativeTransform(
						MathUtils_1.MathUtils.DefaultTransform,
						!1,
						void 0,
						!1,
					);
			}
		}
	}
	SetWeaponByWeaponData(e) {
		e && ((this.QBr = e), this.Refresh());
	}
	HasWeapon() {
		return void 0 !== this.QBr;
	}
	SetWeaponTransformByIndex(e, t) {
		e < 0 || e >= this.XBr.length
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("Weapon", 44, "设置武器偏移索引错误", ["index", e])
			: this.XBr[e].Model?.CheckGetComponent(
					1,
				)?.MainMeshComponent?.K2_SetRelativeTransform(t, !1, void 0, !1);
	}
	SetDitherEffect(e) {
		for (const t of this.XBr) t.Model?.CheckGetComponent(0)?.SetDitherEffect(e);
	}
	GetWeaponCount() {
		return this.$Br;
	}
	OnRoleActiveChange() {
		this.nXt.Actor.bHidden && this.HideAllWeapon();
	}
};
(UiRoleWeaponComponent = __decorate(
	[(0, UiModelComponentDefine_1.RegisterUiModelComponent)(14)],
	UiRoleWeaponComponent,
)),
	(exports.UiRoleWeaponComponent = UiRoleWeaponComponent);
