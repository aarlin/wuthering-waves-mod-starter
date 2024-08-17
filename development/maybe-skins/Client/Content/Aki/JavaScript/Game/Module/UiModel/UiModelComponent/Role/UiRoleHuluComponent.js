"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, n, o) {
		var i,
			r = arguments.length,
			s =
				r < 3
					? t
					: null === o
						? (o = Object.getOwnPropertyDescriptor(t, n))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(e, t, n, o);
		else
			for (var a = e.length - 1; 0 <= a; a--)
				(i = e[a]) && (s = (r < 3 ? i(s) : 3 < r ? i(t, n, s) : i(t, n)) || s);
		return 3 < r && s && Object.defineProperty(t, n, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiRoleHuluComponent = void 0);
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	CharacterNameDefines_1 = require("../../../../NewWorld/Character/Common/CharacterNameDefines"),
	SkeletalObserverManager_1 = require("../../../SkeletalObserver/SkeletalObserverManager"),
	UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
	UiModelComponentBase_1 = require("../UiModelComponentBase"),
	HULU_BASE_ID = 2e7,
	HULU_PARTY_ID = 1e5;
let UiRoleHuluComponent = class extends UiModelComponentBase_1.UiModelComponentBase {
	constructor() {
		super(...arguments),
			(this.Qwr = void 0),
			(this.GBr = void 0),
			(this.nXt = void 0),
			(this.SBr = void 0),
			(this.NBr = void 0),
			(this.olt = CharacterNameDefines_1.CharacterNameDefines.HULU_SOCKET_NAME),
			(this._ti = 0),
			(this.$wr = (e) => {
				e || 2 !== this._ti || this.SetActive(!1);
			}),
			(this.OBr = () => {
				this.Refresh();
			}),
			(this.Jwr = (e) => {
				this.NBr?.Model?.CheckGetComponent(0)?.SetDitherEffect(e);
			}),
			(this.OnRoleMeshLoadComplete = () => {
				this.kBr();
			}),
			(this.OnAnsBegin = (e) => {
				this.SetActive(!0),
					e.IsRotate && this.StartHuluRotate(),
					(e = e.Socket) && this.AttachHuluToRole(e);
			}),
			(this.OnAnsEnd = (e) => {
				this.NBr?.Model?.CheckGetComponent(9)?.StopRotate(), this.SetActive(!1);
			});
	}
	OnInit() {
		(this.GBr = this.Owner.CheckGetComponent(11)),
			(this.Qwr = this.Owner.CheckGetComponent(0)),
			(this.nXt = this.Owner.CheckGetComponent(1)),
			(this.SBr = this.Owner.CheckGetComponent(6)),
			(this.NBr =
				SkeletalObserverManager_1.SkeletalObserverManager.NewSkeletalObserver(
					4,
				)),
			this.SetActive(!1);
	}
	OnStart() {
		EventSystem_1.EventSystem.AddWithTarget(
			this.Owner,
			EventDefine_1.EEventName.OnUiModelLoadComplete,
			this.OnRoleMeshLoadComplete,
		),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Owner,
				EventDefine_1.EEventName.OnUiModelRoleConfigIdChange,
				this.OBr,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Owner,
				EventDefine_1.EEventName.OnUiModelVisibleChange,
				this.$wr,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Owner,
				EventDefine_1.EEventName.OnUiModelSetDitherEffect,
				this.Jwr,
			),
			this.SBr?.RegisterAnsTrigger(
				"UiCalabashAnsContext",
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
				EventDefine_1.EEventName.OnUiModelRoleConfigIdChange,
				this.OBr,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Owner,
				EventDefine_1.EEventName.OnUiModelVisibleChange,
				this.$wr,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Owner,
				EventDefine_1.EEventName.OnUiModelSetDitherEffect,
				this.Jwr,
			),
			SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
				this.NBr,
			);
	}
	GetHuluHandle() {
		return this.NBr;
	}
	Refresh() {
		var e = this.GBr.RoleConfigId;
		e =
			1e5 * ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e).PartyId +
			2e7 +
			1;
		this.NBr.Model.CheckGetComponent(2)?.LoadModelByModelId(e);
	}
	SetActive(e) {
		(e && 2 === this._ti) ||
			(!e && 1 === this._ti) ||
			(this.NBr?.Model?.CheckGetComponent(0)?.SetVisible(e),
			(this._ti = e ? 2 : 1));
	}
	StartHuluRotate() {
		var e, t;
		this.NBr &&
			((e =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"hulu_rotate_time",
				)),
			(t = this.NBr?.Model?.CheckGetComponent(9))?.SetRotateParam(e, 2, !1),
			t?.StartRotate());
	}
	AttachHuluToRole(e = CharacterNameDefines_1.CharacterNameDefines.HULU_CASE) {
		(this.olt = e), this.kBr();
	}
	kBr() {
		var e, t;
		2 === this.Qwr.GetModelLoadState() &&
			((e = this.nXt.MainMeshComponent),
			(t = this.NBr?.Model?.CheckGetComponent(1))?.Actor?.K2_AttachToComponent(
				e,
				this.olt,
				0,
				0,
				0,
				!1,
			),
			t?.Actor?.K2_SetActorRelativeTransform(
				MathUtils_1.MathUtils.DefaultTransform,
				!1,
				void 0,
				!1,
			));
	}
};
(UiRoleHuluComponent = __decorate(
	[(0, UiModelComponentDefine_1.RegisterUiModelComponent)(15)],
	UiRoleHuluComponent,
)),
	(exports.UiRoleHuluComponent = UiRoleHuluComponent);
