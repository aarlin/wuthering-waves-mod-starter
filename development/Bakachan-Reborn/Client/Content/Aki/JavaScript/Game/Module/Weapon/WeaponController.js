"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponController = void 0);
const UE = require("ue"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Transform_1 = require("../../../Core/Utils/Math/Transform"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	RoleController_1 = require("../RoleUi/RoleController"),
	UiModelUtil_1 = require("../UiModel/UiModelUtil");
class WeaponController extends UiControllerBase_1.UiControllerBase {
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnAddWeaponItem,
			this.Qdi,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnResponseWeaponItem,
				this.EOo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRemoveWeaponItem,
				this.Gmi,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnAddWeaponItem,
			this.Qdi,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnResponseWeaponItem,
				this.EOo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRemoveWeaponItem,
				this.Gmi,
			);
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(24360, (e) => {
			e && ModelManager_1.ModelManager.WeaponModel.WeaponRoleLoadEquip(e.uAs);
		}),
			Net_1.Net.Register(28145, (e) => {
				var o = MathUtils_1.MathUtils.LongToNumber(e.rkn);
				(o =
					ModelManager_1.ModelManager.CreatureModel.GetEntity(
						o,
					).Entity.GetComponent(69)) && o.OnEquipWeaponForRoleNotify(e);
			});
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(24360), Net_1.Net.UnRegister(28145);
	}
	static SendPbWeaponLevelUpRequest(e, o) {
		var t = Protocol_1.Aki.Protocol.Tcs.create();
		t.Ykn = e;
		for (const e of o) {
			var n = Protocol_1.Aki.Protocol.Y3s.create();
			(n.I5n = e.SelectedCount),
				(n.Ykn = e.IncId),
				(n.G3n = e.ItemId),
				t.m8n.push(n);
		}
		Net_1.Net.Call(25449, t, (e) => {
			e &&
				(e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
					? ModelManager_1.ModelManager.WeaponModel.WeaponLevelUpResponse(e)
					: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.lkn,
							21506,
						));
		});
	}
	static SendPbWeaponBreachRequest(e, o) {
		var t = Protocol_1.Aki.Protocol.Rcs.create();
		(t.Ykn = e),
			Net_1.Net.Call(28957, t, (t) => {
				var n;
				t &&
					(t.lkn === Protocol_1.Aki.Protocol.lkn.Sys
						? ((n = t.TVn),
							ModelManager_1.ModelManager.WeaponModel.SetWeaponBreachData(e, n),
							o(n),
							UiManager_1.UiManager.OpenView("WeaponBreachSuccessView", e))
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								t.lkn,
								1225,
							));
			});
	}
	static SendPbResonUpRequest(e, o) {
		if (
			!RoleController_1.RoleController.CheckCharacterInBattleTagAndShowTips()
		) {
			var t = Protocol_1.Aki.Protocol.Acs.create();
			(t.Ykn = e), (t.LVn = o);
			const n =
				ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
					e,
				).GetResonanceLevel();
			Net_1.Net.Call(19174, t, (o) => {
				o &&
					(o.lkn === Protocol_1.Aki.Protocol.lkn.Sys
						? (ModelManager_1.ModelManager.WeaponModel.SetWeaponResonanceData(
								o.Ykn,
								o.dbs,
							),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.WeaponResonanceSuccess,
								e,
								n,
							))
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								o.lkn,
								27374,
							));
			});
		}
	}
	static SendPbEquipTakeOnRequest(e, o, t) {
		var n;
		RoleController_1.RoleController.CheckCharacterInBattleTagAndShowTips() ||
			!e ||
			e <= 0 ||
			(((n = Protocol_1.Aki.Protocol.lis.create()).Kkn =
				Protocol_1.Aki.Protocol.ENs.create()),
			(n.Kkn.DVn = e),
			(n.Kkn.M3n = o),
			(n.Kkn.AVn = t),
			Net_1.Net.Call(22138, n, (e) => {
				e &&
					(e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
						? ModelManager_1.ModelManager.WeaponModel.WeaponRoleLoadEquip(e.uAs)
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.lkn,
								22403,
							));
			}));
	}
	static OnSelectedWeaponChange(e, o, t) {
		const n = o.Model;
		if (n) {
			o = e.GetWeaponConfig();
			const a =
					ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponModelTransformData(
						o.TransformId,
					),
				l = (n.CheckGetComponent(18)?.SetWeaponData(e), n.CheckGetComponent(1));
			l?.SetTransformByTag("WeaponCase"),
				n.CheckGetComponent(2)?.LoadModelByModelId(o.ModelId, !1, () => {
					UiModelUtil_1.UiModelUtil.SetVisible(n, !0);
					var e = Vector_1.Vector.Create(
							a.Location.X,
							a.Location.Y,
							a.Location.Z,
						),
						o = Rotator_1.Rotator.Create(
							a.Rotation.Y,
							a.Rotation.Z,
							a.Rotation.X,
						),
						t = Vector_1.Vector.Create(a.Size, a.Size, a.Size);
					e = Transform_1.Transform.Create(o.Quaternion(), e, t);
					(t =
						(l?.MainMeshComponent?.K2_SetRelativeTransform(
							e.ToUeTransform(),
							!1,
							void 0,
							!1,
						),
						UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
							n,
							"WeaponRootWeaponMaterialController",
						),
						UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(
							n,
							"WeaponRootWeaponShowHideEffect",
						),
						n.CheckGetComponent(9))).SetRotateParam(a.RotateTime),
						t.StartRotate(),
						o.Set(a.AxisRotate.Y, a.AxisRotate.Z, a.AxisRotate.X),
						l?.Actor?.K2_SetActorRotation(o.ToUeRotator(), !1);
				});
			const i = t.Model;
			if (i)
				if (((o = i.CheckGetComponent(18)), a.ShowScabbard)) {
					if (1 < (t = e.GetWeaponConfig().Models).length) {
						const n = i.CheckGetComponent(1);
						var r = i.CheckGetComponent(2);
						o.SetWeaponData(e),
							r.LoadModelByModelId(t[1], !1, () => {
								n.Actor.K2_AttachToActor(l.Actor, void 0, 2, 1, 1, !1),
									n.SetTransformByTag("WeaponScabbardCase"),
									n.Actor?.K2_SetActorRelativeLocation(
										Vector_1.Vector.ZeroVector,
										!1,
										void 0,
										!1,
									);
								var e = Transform_1.Transform.Create();
								e.SetLocation(a.ScabbardOffset),
									n.MainMeshComponent?.K2_SetRelativeTransform(
										e.ToUeTransform(),
										!1,
										void 0,
										!1,
									),
									UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
										i,
										"WeaponRootWeaponMaterialController",
									);
							});
					}
				} else UiModelUtil_1.UiModelUtil.SetVisible(i, !1);
		}
	}
	static PlayWeaponRenderingMaterial(e, o, t) {
		UiModelUtil_1.UiModelUtil.SetRenderingMaterial(o.Model, e),
			t && UiModelUtil_1.UiModelUtil.SetRenderingMaterial(t.Model, e);
	}
	static ApplyWeaponLevelMaterial(e, o, t = 0) {
		UE.BP_CharacterRenderingFunctionLibrary_C.ApplyWeaponLevelMaterial(
			e,
			o,
			t,
			e,
		);
	}
	static RoleFadeIn(e) {
		const o = e.Model.CheckGetComponent(8);
		(e =
			ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				"RoleFadeInCurve",
			)),
			ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.CurveFloat, (e) => {
				var t;
				e &&
					((t =
						CommonParamById_1.configCommonParamById.GetIntConfig(
							"RoleFadeInDuration",
						)),
					o?.Fade(1, 0, t, e));
			});
	}
	static RoleFadeOut(e) {
		const o = e.Model.CheckGetComponent(8);
		(e =
			ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				"RoleFadeOutCurve",
			)),
			ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.CurveFloat, (e) => {
				var t;
				e &&
					((t = CommonParamById_1.configCommonParamById.GetIntConfig(
						"RoleFadeOutDuration",
					)),
					o?.Fade(0, 1, t, e));
			});
	}
}
((exports.WeaponController = WeaponController).Qdi = (e) => {
	ModelManager_1.ModelManager.WeaponModel.AddWeaponData(e);
}),
	(WeaponController.EOo = (e) => {
		ModelManager_1.ModelManager.WeaponModel.AddWeaponData(e);
	}),
	(WeaponController.Gmi = (e) => {
		for (const o of e)
			ModelManager_1.ModelManager.WeaponModel.RemoveWeaponData(o);
	});
