"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, i, r) {
		var a,
			o = arguments.length,
			s =
				o < 3
					? t
					: null === r
						? (r = Object.getOwnPropertyDescriptor(t, i))
						: r;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(e, t, i, r);
		else
			for (var n = e.length - 1; 0 <= n; n--)
				(a = e[n]) && (s = (o < 3 ? a(s) : 3 < o ? a(t, i, s) : a(t, i)) || s);
		return 3 < o && s && Object.defineProperty(t, i, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterWeaponComponent = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	ModelUtil_1 = require("../../../../../Core/Utils/ModelUtil"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext"),
	EffectSystem_1 = require("../../../../Effect/EffectSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	WeaponController_1 = require("../../../../Module/Weapon/WeaponController"),
	CharacterNameDefines_1 = require("../CharacterNameDefines"),
	CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
	CharacterWeaponMesh_1 = require("./Weapon/CharacterWeaponMesh"),
	KEEP_WEAPON_OUT_THREADHOLD = 0.1,
	WEAPON_IN_DELAY = 100,
	HIDE_WEAPON_AFTER_WEAPON_IN_DELAY = 1e3,
	BASE_GLIDING_ID = 20010001,
	glideRelativeRotator = new UE.Rotator(0, 90, -90),
	HULU_BASE_ID = 2e7,
	HULU_PARTY_ID = 1e5;
class HideWeaponOrder {
	constructor(e, t, i, r = !0, a = 0) {
		(this.Index = 0),
			(this.Hide = !1),
			(this.WithEffect = !1),
			(this.NormaState = !0),
			(this.ExtraType = 0),
			(this.Index = e),
			(this.Hide = t),
			(this.WithEffect = i),
			(this.NormaState = r),
			(this.ExtraType = a);
	}
}
class WeaponEquipInfo {
	constructor() {
		(this.WeaponId = 0),
			(this.WeaponConfig = void 0),
			(this.WeaponBreachLevel = 0);
	}
	SetData(e) {
		if (!e.Dps && !e.QMs)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Character",
						58,
						"[武器组件]获取武器配置失败 pb",
						["weaponId", e.Dps ?? void 0],
						["WeaponBreachLevel", e.QMs ?? void 0],
					),
				!1
			);
		if (this.WeaponId !== e.Dps) {
			this.WeaponId = e.Dps;
			var t =
				ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
					this.WeaponId,
				);
			if (!t)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Character", 58, "[武器组件]获取武器配置失败", [
							"weaponId",
							this.WeaponId,
						]),
					!1
				);
			this.WeaponConfig = t;
		}
		return (this.WeaponBreachLevel = e.QMs), !0;
	}
}
let CharacterWeaponComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.Hte = void 0),
			(this.oRe = void 0),
			(this.Lie = void 0),
			(this.Hulu = void 0),
			(this.uQr = 0),
			(this.HuluHideEffect = 0),
			(this.Paragliding = void 0),
			(this.ParaglidingIsOpen = !1),
			(this.ParaglidingIsHover = !1),
			(this.ParaglidingIsAscent = !1),
			(this.cQr = -1),
			(this.mQr = void 0),
			(this.dQr = 0),
			(this.CQr = 0),
			(this.gQr = void 0),
			(this.fQr = void 0),
			(this.XHt = !1),
			(this.pQr = !1),
			(this.vQr = new Array()),
			(this.AiItemMarkId = 0),
			(this.AiWeaponConfigId = 0),
			(this.CacheAiSocketItem = void 0),
			(this.MQr = void 0),
			(this.SQr = void 0),
			(this.EQr = 0),
			(this.yQr = 0),
			(this.IQr = void 0),
			(this.TQr = void 0),
			(this.LQr = void 0),
			(this.DQr = void 0),
			(this.RQr = 0),
			(this.AQr = void 0),
			(this.UQr = void 0),
			(this.PQr = void 0),
			(this.xQr = void 0),
			(this.wQr = Vector_1.Vector.Create()),
			(this.BQr = void 0),
			(this.bQr = 10),
			(this.qQr = !0),
			(this.WeaponEquipInfo = void 0),
			(this.GQr = (e, t) => {
				this.SetWeaponVisibleByTag(t, e, !0);
			}),
			(this.NQr = (e, t) => {
				this.SetWeaponVisibleByTag(t, e, !1);
			}),
			(this.W3r = (e, t, i) => {
				var r;
				(e?.Valid
					? ((r = e.GetComponent(69)),
						this.OQr(),
						this.CheckAndHangWeapons(!1),
						0 === t || i
							? (this.kQr(0),
								this.SyncParagliding(r),
								(t = e.GetComponent(185)).HasTag(this.yQr) &&
									!this.Lie.HasTag(this.yQr) &&
									(t.RemoveTag(this.yQr), this.Lie.AddTag(this.yQr)),
								r)
							: (this.kQr(0), this))
					: this
				).OpenParagliding(!1);
			}),
			(this.FQr = (e, t) => {
				!t ||
					this.ParaglidingIsOpen ||
					this.Entity.GetComponent(158).MoveState !==
						CharacterUnifiedStateTypes_1.ECharMoveState.Glide ||
					this.OpenParagliding(!0);
			}),
			(this.VQr = (e, t) => {
				!t &&
					this.ParaglidingIsOpen &&
					((t = EffectSystem_1.EffectSystem.SpawnEffect(
						this.Hte.Actor,
						this.Hte.Actor.Mesh.GetSocketTransform(
							CharacterNameDefines_1.CharacterNameDefines.GLIDEING_SOCKETNAME,
							1,
						),
						"/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Huaxiang_End.DA_Fx_Group_Huaxiang_End",
						"[CharacterWeaponComponent.OnGlidingChanged]",
						new EffectContext_1.EffectContext(this.Entity.Id),
					)),
					EffectSystem_1.EffectSystem.IsValid(t) &&
						(t = EffectSystem_1.EffectSystem.GetEffectActor(t)) &&
						t.IsValid() &&
						t.K2_AttachToComponent(
							this.Paragliding,
							FNameUtil_1.FNameUtil.EMPTY,
							0,
							0,
							0,
							!1,
						),
					this.OpenParagliding(!1),
					this.Lie.RemoveTag(this.yQr));
			}),
			(this.HQr = (e, t) => {
				this.ParaglidingIsHover = t;
				var i = this.Paragliding.GetAnimInstance();
				i && i.SetHover(t);
			}),
			(this.z3r = (e, t) => {
				this.Hte.IsMoveAutonomousProxy &&
					t === CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp &&
					e !== t &&
					this.ReceiveCharacterKnockUpDropWeapon();
			}),
			(this.jQr = (e, t) => {
				t
					? EffectSystem_1.EffectSystem.IsValid(this.HuluHideEffect) ||
						((t = ModelUtil_1.ModelUtil.GetModelConfig(this.uQr)),
						this.kQr(0),
						(this.HuluHideEffect = EffectSystem_1.EffectSystem.SpawnEffect(
							this.Hte.Actor,
							this.Hte.Actor.Mesh.GetSocketTransform(
								CharacterNameDefines_1.CharacterNameDefines
									.HULU_EFFECT_SOCKET_NAME,
								1,
							),
							t.DA.AssetPathName?.toString(),
							"[CharacterWeaponComponent.OnHuluHandEffectShowChanged]",
							new EffectContext_1.EffectContext(this.Entity.Id),
						)),
						EffectSystem_1.EffectSystem.IsValid(this.HuluHideEffect) &&
							(t = EffectSystem_1.EffectSystem.GetEffectActor(
								this.HuluHideEffect,
							)) &&
							t.IsValid() &&
							t.K2_AttachToComponent(
								this.Hte.Actor.Mesh,
								CharacterNameDefines_1.CharacterNameDefines
									.HULU_EFFECT_SOCKET_NAME,
								2,
								2,
								2,
								!1,
							))
					: (EffectSystem_1.EffectSystem.IsValid(this.HuluHideEffect) &&
							(EffectSystem_1.EffectSystem.StopEffectById(
								this.HuluHideEffect,
								"[CharacterWeaponComponent.OnHuluHandEffectShowChanged]",
								!0,
							),
							(this.HuluHideEffect = 0)),
						this.Lie.HasTag(-1775045118) || this.SetHuluHidden(!1));
			}),
			(this.WQr = (e, t) => {
				t
					? (this.kQr(1), this.SetHuluHidden(!1, !1))
					: (this.kQr(0), this.SetHuluHidden(!1));
			}),
			(this.KQr = (e, t) => {
				switch (this.RQr) {
					case 0:
						this.SetHuluHidden(t, !0, !0);
						break;
					case 1:
						this.SetHuluHidden(t, !1);
				}
			}),
			(this.QQr = new Set()),
			(this.XQr = (e, t) => {
				t ? this.QQr.add(e) : this.QQr.delete(e);
			}),
			(this.$Qr = () => {
				this.YQr();
			});
	}
	static get Dependencies() {
		return [3];
	}
	get BPr() {
		return this.cQr;
	}
	set BPr(e) {
		this.cQr !== e &&
			((this.cQr = e), this.Lie) &&
			(0 === e
				? this.Lie.HasTag(-2075724632) || this.Lie.AddTag(-2075724632)
				: this.Lie.HasTag(-2075724632) && this.Lie.RemoveTag(-2075724632));
	}
	SetParaglidingIsAscent(e) {
		this.ParaglidingIsAscent = e;
		var t = this.Paragliding.GetAnimInstance();
		t && t.SetDash(e);
	}
	OnInitData() {
		return (
			(this.BQr = new UE.Transform()),
			(this.WeaponEquipInfo = new WeaponEquipInfo()),
			!0
		);
	}
	OnInit() {
		return !0;
	}
	OnStart() {
		if (
			((this.Hte = this.Entity.CheckGetComponent(3)),
			(this.oRe = this.Entity.GetComponent(160)),
			(this.Lie = this.Entity.GetComponent(185)),
			(this.XHt =
				this.Hte.CreatureData.GetEntityType() ===
				Protocol_1.Aki.Protocol.wks.Proto_Player),
			(this.pQr =
				this.XHt ||
				4 === this.Hte.CreatureData.GetBaseInfo()?.Category.MonsterMatchType),
			(this.EQr = 0),
			(this.AiItemMarkId = 0),
			!this.Hte)
		)
			return !1;
		if ((this.JQr(), this.zQr(), this.ZQr(), this.XHt)) {
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.RoleOnStateInherit,
				this.W3r,
			),
				(this.yQr = 1905601506),
				(this.IQr = this.Lie.ListenForTagAddOrRemove(this.yQr, this.FQr)),
				(this.TQr = this.Lie.ListenForTagAddOrRemove(262865373, this.VQr)),
				(this.LQr = this.Lie.ListenForTagAddOrRemove(921953316, this.HQr)),
				(this.UQr = this.Lie.ListenForTagAddOrRemove(-1660069905, this.jQr)),
				(this.AQr = this.Lie.ListenForTagAddOrRemove(507209871, this.WQr)),
				(this.PQr = this.Lie.ListenForTagAddOrRemove(-1775045118, this.KQr)),
				this.eXr(),
				this.InitWeaponVisibleData(),
				this.d8s();
			for (const e of this.mQr.CharacterWeapons) this.tXr(e, !0, !1);
		}
		return !0;
	}
	OnTick(e) {
		this.pQr && this.CheckAndHangWeapons(!0);
		for (const e of this.vQr) {
			var t;
			if (e.Index < 0)
				for (const t of this.mQr.CharacterWeapons)
					e.NormaState ||
						t.VisibleHelper.EnableHiddenInGameByExtraVisibleType(
							e.ExtraType,
							!0,
						),
						this.tXr(t, e.Hide, e.WithEffect, e.NormaState, e.ExtraType);
			else
				e.Index < this.mQr.CharacterWeapons.length
					? ((t = this.mQr.CharacterWeapons[e.Index]),
						e.NormaState ||
							t.VisibleHelper.EnableHiddenInGameByExtraVisibleType(
								e.ExtraType,
								!0,
							),
						this.tXr(t, e.Hide, e.WithEffect, e.NormaState, e.ExtraType))
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Character",
							6,
							"隐藏武器选择了错误的武器序号",
							["index", e.Index],
							["BP", this.Hte.Actor.GetName()],
						);
		}
		if ((this.vQr.length = 0) === this.BPr && 0 < this.QQr.size)
			for (const e of this.mQr.CharacterWeapons) this.tXr(e, !0, !0);
		this.iXr(e), this.oXr(), this.rXr();
	}
	OnClear() {
		this.ClearWeaponVisibleData(),
			this.mQr?.Destroy(),
			(this.mQr = void 0),
			EffectSystem_1.EffectSystem.IsValid(this.HuluHideEffect) &&
				(EffectSystem_1.EffectSystem.StopEffectById(
					this.HuluHideEffect,
					"[CharacterWeaponComponent.OnClear]",
					!0,
				),
				(this.HuluHideEffect = 0)),
			this.gQr &&
				(TimerSystem_1.TimerSystem.Remove(this.gQr), (this.gQr = void 0)),
			this.fQr &&
				(TimerSystem_1.TimerSystem.Remove(this.fQr), (this.fQr = void 0)),
			this.XHt
				? (EventSystem_1.EventSystem.RemoveWithTarget(
						this.Entity,
						EventDefine_1.EEventName.RoleOnStateInherit,
						this.W3r,
					),
					this.IQr.EndTask(),
					this.TQr.EndTask(),
					this.LQr.EndTask(),
					(this.IQr = void 0),
					(this.TQr = void 0),
					(this.LQr = void 0),
					this.UQr.EndTask(),
					(this.UQr = void 0),
					this.PQr.EndTask(),
					(this.PQr = void 0),
					this.AQr.EndTask(),
					(this.AQr = void 0),
					this.DQr.forEach((e) => {
						e.EndTask();
					}),
					(this.DQr = []))
				: (this.ClearWeaponForAi(), (this.AiWeaponConfigId = 0));
		var e = this.Paragliding?.GetAnimInstance();
		return (
			e?.DebugDestructText &&
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Role", 6, "Paragliding OnClear", [
						"DebugDesturctText",
						e.DebugDestructText,
					]),
				(e.DebugDestructText = "")),
			!0
		);
	}
	eXr() {
		this.Lie.HasTag(this.yQr) && this.OpenParagliding(!0);
	}
	JQr() {
		this.mQr = new CharacterWeaponMesh_1.CharacterWeaponMesh();
		var e,
			t = this.Hte.Actor.K2_GetComponentsByClass(
				UE.MeshComponent.StaticClass(),
			),
			i = new Array();
		for (let e = 0; e < t.Num(); ++e) {
			var r = t.Get(e);
			r instanceof UE.SkeletalMeshComponent &&
				r.GetName().startsWith("WeaponCase") &&
				(i.push(r), (r.bAbsoluteScale = !1));
		}
		this.XHt
			? ((e = this.Entity.GetComponent(0).GetRoleConfig().WeaponScale),
				this.wQr.Set(e[0], e[1], e[2]),
				this.BQr.SetScale3D(this.wQr.ToUeVector()))
			: this.wQr.Set(1, 1, 1),
			this.mQr.Init(i, this.Hte.Actor.Mesh, this.Hte.Actor, !1),
			0 < this.mQr.CharacterWeapons.length &&
				(this.XHt
					? (this.nXr(), this.EquipWeaponForRole(), this.sXr())
					: this.pQr &&
						(this.nXr(),
						this.sXr(),
						this.wQr.FromUeVector(
							this.mQr?.CharacterWeapons[0].Mesh.RelativeScale3D,
						))),
			this.XHt || this.aXr();
	}
	nXr() {
		var e = this.Entity.GetComponent(0).GetModelConfig(),
			t = e.NormalSockets,
			i = e.BattleSockets;
		t.Num() !== i.Num() &&
			Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Character",
				58,
				"角色设置武器失败,两种类型槽位数量不统一",
				["Id", this.Hte.Actor.GetName()],
				["ModelId", e.ID],
			),
			(t.Num() > this.mQr.CharacterWeapons.length ||
				i.Num() > this.mQr.CharacterWeapons.length) &&
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Character",
						58,
						"角色设置武器失败,角色蓝图武器组件少于武器数量配置",
						["Id", this.Hte.Actor.GetName()],
						["ModelId", e.ID],
					),
				this.mQr.ChangeCharacterWeapons(t.Num()));
		let r = 0;
		for (const e of this.mQr.CharacterWeapons)
			(e.NormalSocket = FNameUtil_1.FNameUtil.GetDynamicFName(t.Get(r))),
				(e.BattleSocket = FNameUtil_1.FNameUtil.GetDynamicFName(i.Get(r))),
				++r;
	}
	sXr() {
		this.BPr = 0;
		for (const e of this.mQr.CharacterWeapons)
			this.X9o(e, e.NormalSocket, this.BQr, !1);
		this.HideWeapon(-1, !0, !1), (this.fQr = void 0);
	}
	aXr() {
		this.hXr();
		var e = this.Hte.CreatureData?.ComponentDataMap.get("Kvs");
		e &&
			((e = e.Kvs?.Dps)
				? (this.RegisterCharacterDropWeaponEvent(e),
					this.ChangeWeaponByWeaponByConfigId(e))
				: ((this.BPr = -1), this.WeaponIn(!1)));
	}
	ZQr() {
		var e;
		this.XHt &&
			((e = this.Hte.Actor.AddComponentByClass(
				UE.SkeletalMeshComponent.StaticClass(),
				!1,
				MathUtils_1.MathUtils.DefaultTransform,
				!1,
				CharacterNameDefines_1.CharacterNameDefines.PARAGLIDING_MESH_COMP_NAME,
			)).K2_AttachToComponent(
				this.Hte.Actor.Mesh,
				CharacterNameDefines_1.CharacterNameDefines.GLIDEING_SOCKETNAME,
				0,
				0,
				0,
				!0,
			),
			(this.Paragliding = e),
			this.SetNewParagliding(20010001),
			this.Paragliding.K2_SetRelativeLocation(
				Vector_1.Vector.ZeroVectorProxy.ToUeVector(),
				!1,
				void 0,
				!1,
			),
			this.Paragliding.K2_SetRelativeRotation(
				glideRelativeRotator,
				!1,
				void 0,
				!1,
			),
			this.Paragliding.SetWorldScale3D(
				Vector_1.Vector.OneVectorProxy.ToUeVector(),
			),
			this.lXr(!0),
			Log_1.Log.CheckDebug()) &&
			Log_1.Log.Debug(
				"Weapon",
				58,
				"加载滑翔伞",
				["location", this.Paragliding?.K2_GetComponentLocation()?.ToString()],
				["characterLocation", this.Hte?.ActorLocation?.ToString()],
			);
	}
	lXr(e) {
		(this.ParaglidingIsOpen = !e),
			TimerSystem_1.TimerSystem.Next(() => {
				this.Paragliding.SetHiddenInGame(!this.ParaglidingIsOpen);
			});
	}
	OpenParagliding(e) {
		var t;
		(this.ParaglidingIsOpen = e),
			this.Paragliding &&
				((t = this.Paragliding.GetAnimInstance())
					? (Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"Weapon",
								58,
								"打开滑翔伞",
								["bOpen", e],
								[
									"location",
									this.Paragliding?.K2_GetComponentLocation()?.ToString(),
								],
								["characterLocation", this.Hte?.ActorLocation?.ToString()],
							),
						this.Hte &&
							(e
								? AudioSystem_1.AudioSystem.PostEvent(
										"play_role_com_paragliding_open",
										this.Hte.Actor,
									)
								: AudioSystem_1.AudioSystem.PostEvent(
										"play_role_com_paragliding_close",
										this.Hte.Actor,
									)),
						t.SetOpenParagliding(e),
						t.SyncAnimStates(void 0),
						this.lXr(!e),
						e || UE.KuroAnimLibrary.EndAnimNotifyStates(t))
					: Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Weapon", 58, "打开滑翔伞: 异步未加载完成返回"));
	}
	SetNewParagliding(e) {
		const t = ModelUtil_1.ModelUtil.GetModelConfig(e);
		ResourceSystem_1.ResourceSystem.LoadAsync(
			t.网格体.ToAssetPathName(),
			UE.SkeletalMesh,
			(e) => {
				this.Paragliding.SetSkeletalMesh(e, !1),
					ResourceSystem_1.ResourceSystem.LoadAsync(
						t.动画蓝图.ToAssetPathName(),
						UE.Class,
						(t) => {
							this.Paragliding.SetAnimClass(t),
								this.ParaglidingIsOpen && this.OpenParagliding(!0);
							var i = this.Paragliding.GetAnimInstance();
							i
								? ((i.DebugDestructText =
										`Owner: ${this.Hte?.Owner?.GetName()}, Self: ${this.Paragliding?.GetName()} entityId: ${this.Entity.Id} pbDataId: ` +
										this.Hte?.CreatureData.GetPbDataId()),
									Log_1.Log.CheckWarn() &&
										Log_1.Log.Warn("Test", 6, i.DebugDestructText))
								: Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"Test",
										6,
										"SetNewParagliding Error!",
										["Mesh", e?.GetName()],
										["NewClass", t?.GetName()],
									);
						},
					);
			},
		);
	}
	SyncParagliding(e) {
		this.lXr(!e.ParaglidingIsOpen),
			e.lXr(!0),
			(e = e.Paragliding.GetAnimInstance()),
			this.Paragliding.GetAnimInstance()?.SyncAnim(e),
			e?.SyncAnim(void 0),
			UE.KuroAnimLibrary.EndAnimNotifyStates(e);
	}
	zQr() {
		var e;
		this.XHt &&
			((this.HuluHideEffect = 0),
			(this.xQr = void 0),
			(e = this.Entity.GetComponent(0)),
			(e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
				e.GetRoleId(),
			)),
			this._Xr(e.PartyId, 1));
	}
	_Xr(e, t) {
		this.Hulu
			? this.Hte.Actor.CharRenderingComponent.RemoveComponentByCase(6)
			: ((r = this.Hte.Actor.AddComponentByClass(
					UE.SkeletalMeshComponent.StaticClass(),
					!1,
					MathUtils_1.MathUtils.DefaultTransform,
					!1,
					CharacterNameDefines_1.CharacterNameDefines.HULU_MESH_COMP_NAME,
				)).K2_AttachToComponent(
					this.Hte.Actor.Mesh,
					CharacterNameDefines_1.CharacterNameDefines.HULU_SOCKET_NAME,
					0,
					0,
					0,
					!0,
				),
				(this.Hulu = r),
				this.kQr(0));
		const i = 1e5 * e + 2e7 + t;
		var r = ModelUtil_1.ModelUtil.GetModelConfig(i);
		r
			? ResourceSystem_1.ResourceSystem.LoadAsync(
					r.网格体.ToAssetPathName(),
					UE.SkeletalMesh,
					(e) => {
						e
							? ((this.uQr = i),
								this.Hulu.SetSkeletalMesh(e),
								this.Hte.Actor.CharRenderingComponent.AddComponentByCase(
									6,
									this.Hulu,
								))
							: Log_1.Log.CheckError() &&
								Log_1.Log.Error("Character", 58, "该葫芦Id没有配置网格体", [
									"Id",
									i,
								]);
					},
				)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Character", 58, "该葫芦Id没有配置Config", ["Id", i]);
	}
	kQr(e) {
		if (e !== this.RQr) {
			let t,
				i = FNameUtil_1.FNameUtil.EMPTY;
			switch (e) {
				case 0:
					(i = CharacterNameDefines_1.CharacterNameDefines.HULU_SOCKET_NAME),
						(t = this.Hte.Actor.Mesh);
					break;
				case 1:
					(i =
						CharacterNameDefines_1.CharacterNameDefines
							.HULU_GLIDEING_SOCKET_NAME),
						(t = this.Paragliding);
			}
			this.Hulu.K2_AttachToComponent(t, i, 0, 0, 0, !0), (this.RQr = e);
		}
	}
	GetHuluId() {
		return this.uQr;
	}
	SetHuluHidden(e, t = !0, i = !1) {
		(i && this.Hulu.bHiddenInGame === e) ||
			(!t || e
				? (this.xQr &&
						0 <= this.xQr &&
						(this.Hte.Actor.CharRenderingComponent.RemoveMaterialControllerData(
							this.xQr,
						),
						(this.xQr = void 0)),
					this.Hulu.SetHiddenInGame(e))
				: (this.xQr &&
						0 <= this.xQr &&
						(this.Hte.Actor.CharRenderingComponent.RemoveMaterialControllerData(
							this.xQr,
						),
						(this.xQr = void 0)),
					this.Hulu.SetHiddenInGame(!0),
					ResourceSystem_1.ResourceSystem.LoadAsync(
						"/Game/Aki/Effect/MaterialController/Common/DA_Fx_HuluStart.DA_Fx_HuluStart",
						UE.PD_CharacterControllerData_C,
						(e) => {
							1 !== this.RQr &&
								((this.xQr =
									this.Hte.Actor.CharRenderingComponent.AddMaterialControllerData(
										e,
									)),
								this.Hulu.SetHiddenInGame(!1));
						},
					)));
	}
	hXr() {
		this.AiWeaponConfigId = 0;
	}
	ClearWeaponForAi() {
		(this.BPr = 0),
			this.mQr?.ChangeCharacterWeapons(0),
			(this.AiItemMarkId = 0),
			this.UnRegisterCharacterDropWeaponEvent();
	}
	ChangeWeaponByWeaponByConfigId(e) {
		var t = ModelManager_1.ModelManager.AiWeaponModel.GetWeaponConfigByConfigId(
			e,
			this.Entity,
		);
		t
			? this.ChangeWeaponByWeaponSocketItem(t)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Character",
					58,
					"Ai改变武器失败,原因Config配置错误",
					["Id", this.Hte.Actor.GetName()],
					["Char", this.Hte.Actor.GetName()],
					["Item config id", e],
				);
	}
	ChangeWeaponByWeaponSocketItem(e) {
		this.OldWeaponHidden(),
			(this.BPr = 1),
			(this.MQr = e),
			this.gQr &&
				(TimerSystem_1.TimerSystem.Remove(this.gQr), (this.gQr = void 0)),
			(e = this.mQr.ChangeCharacterWeapons(this.MQr.Meshes.Num())),
			this.Hte.Actor.CharRenderingComponent.Init(this.Hte.Actor.RenderType);
		let t = 0;
		for (const r of e) {
			var i = this.MQr.Meshes.Get(t);
			const e = r.Mesh,
				a = this.MQr.WeaponEffectPath.AssetPathName?.toString(),
				o = i.AnimInstanceSoftPtr.ToAssetPathName();
			e instanceof UE.SkeletalMeshComponent &&
				ResourceSystem_1.ResourceSystem.LoadAsync(
					i.MeshSoftPtr.ToAssetPathName(),
					UE.SkeletalMesh,
					(t) => {
						e.SetSkeletalMesh(t),
							o &&
								"" !== o &&
								ResourceSystem_1.ResourceSystem.LoadAsync(o, UE.Class, (t) => {
									e.SetAnimClass(t);
								}),
							a &&
								ResourceSystem_1.ResourceSystem.LoadAsync(
									a,
									UE.PD_CharacterControllerData_C,
									(e) => {
										r.BattleEffectId =
											this.Hte.Actor.CharRenderingComponent.AddMaterialControllerData(
												e,
											);
									},
								);
					},
				),
				(r.WeaponHidden = !1),
				(r.BattleEffectId = void 0),
				(r.BattleSocket = i.SocketName),
				++t;
		}
		this.WeaponOutInternal(0),
			(this.MQr = void 0),
			(this.SQr = void 0),
			this.SQr &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error("Character", 58, "Ai改变武器失败,Config没有被清理", [
					"Id",
					this.SQr,
				]);
	}
	EquipWeaponForRole() {
		var e = this.Entity.GetComponent(0).ComponentDataMap.get("ips")?.ips;
		return !!e && this.EquipWeaponForRoleByWeaponComponent(e);
	}
	EquipWeaponForRoleByWeaponComponent(e) {
		if (!this.WeaponEquipInfo.SetData(e))
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Character",
						6,
						"[武器组件]获取武器配置失败 pb",
						["Character", this.Hte?.Actor.GetName()],
						["ConfigId", this.Hte?.CreatureData.GetRoleId()],
						["weaponId", e.Dps ?? void 0],
						["WeaponBreachLevel", e.QMs ?? void 0],
					),
				!1
			);
		if (!(e = this.WeaponEquipInfo.WeaponConfig)) return !1;
		var t = e.Models;
		if (
			((this.qQr = 0 < e.HiddenTime),
			(this.bQr = e.HiddenTime),
			t.length !== this.mQr.CharacterWeapons.length)
		)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Character",
						58,
						"角色配置武器失败 蓝图武器component数量与配置数量不配置",
						["Id", this.SQr],
						["ModelIds", t],
					),
				!1
			);
		let i = 1;
		for (let e = 0; e < this.EQr; ++e)
			this.Hte.Actor.CharRenderingComponent.RemoveComponentByCase(i), (i += 1);
		let r = 0;
		for (const e of t) {
			const t = this.mQr.CharacterWeapons[r].Mesh;
			if (t instanceof UE.SkeletalMeshComponent) {
				const i = 1 + r,
					a = ModelUtil_1.ModelUtil.GetModelConfig(e);
				a &&
					(ResourceSystem_1.ResourceSystem.LoadAsync(
						a.网格体.ToAssetPathName(),
						UE.SkeletalMesh,
						(e) => {
							if (e) {
								var r = t.GetNumMaterials();
								for (let e = 0; e < r; ++e) t.SetMaterial(e, void 0);
								var o = e.Materials,
									s = o.Num();
								t.SetSkeletalMesh(e);
								for (let e = 0; e < s; ++e)
									t.SetMaterial(e, o.Get(e).MaterialInterface);
								(e = a.动画蓝图.ToAssetPathName()) &&
									"" !== e &&
									ResourceSystem_1.ResourceSystem.LoadAsync(
										e,
										UE.Class,
										(e) => {
											e && t.SetAnimClass(e);
										},
									),
									this.Hte.Actor.CharRenderingComponent.AddComponentByCase(
										i,
										t,
									),
									(e = a.DA.AssetPathName?.toString()),
									e &&
										"" !== e &&
										ResourceSystem_1.ResourceSystem.LoadAsync(
											e,
											UE.PD_WeaponLevelMaterialDatas_C,
											(e) => {
												e &&
													WeaponController_1.WeaponController.ApplyWeaponLevelMaterial(
														t,
														e,
														this.WeaponEquipInfo.WeaponBreachLevel,
													);
											},
										);
							}
						},
					),
					++r);
			}
		}
		return (this.EQr = r), !0;
	}
	OnEquipWeaponForRoleNotify(e) {
		this.EquipWeaponForRoleByWeaponComponent(e.ips);
	}
	CheckAndHangWeapons(e) {
		0 === this.BPr
			? this.Lie.HasTag(-1348147833) && this.WeaponOut()
			: (this.oRe?.Valid && !(this.oRe.BattleIdleEndTime <= 0)) ||
				this.Lie.HasTag(-1348147833) ||
				(this.oRe.Valid &&
					this.oRe.MainAnimInstance &&
					!(
						this.oRe.MainAnimInstance.GetMainAnimsCurveValueWithDelta(
							CharacterNameDefines_1.CharacterNameDefines.KEEP_WEAPON_OUT_NAME,
							0,
						) < 0.1
					)) ||
				this.WeaponIn(e);
	}
	HideWeaponsWhenHideBones(e, t) {
		if (this.Hte) {
			var i = CharacterNameDefines_1.CharacterNameDefines.ROOT;
			for (const r of this.mQr.CharacterWeapons) {
				let a = r.Mesh.GetAttachSocketName();
				if (!FNameUtil_1.FNameUtil.IsEmpty(a)) {
					for (; !i.op_Equality(a) && !t.op_Equality(a); )
						a = this.Hte.Actor.Mesh.GetParentBone(a);
					a.op_Equality(t) && r.Mesh.SetHiddenInGame(e);
				}
			}
		}
	}
	iXr(e) {
		if (!(this.CQr >= this.dQr) && this.Hte) {
			this.CQr += e;
			var t = Math.min(this.CQr / this.dQr, 1);
			for (const e of this.mQr.CharacterWeapons)
				UE.KismetMathLibrary.TLerp(
					e.LerpStartTransform,
					e.LerpEndTransform,
					t,
				).SetScale3D(this.wQr.ToUeVector()),
					e.Mesh.K2_SetRelativeTransform(
						UE.KismetMathLibrary.TLerp(
							e.LerpStartTransform,
							e.LerpEndTransform,
							t,
						),
						!1,
						void 0,
						!1,
					);
		}
	}
	WeaponInInternal(e, t = 0) {
		if (((this.BPr = 0), this.Hte))
			if (
				(this.gQr &&
					(TimerSystem_1.TimerSystem.Remove(this.gQr), (this.gQr = void 0)),
				this.fQr &&
					(TimerSystem_1.TimerSystem.Remove(this.fQr), (this.fQr = void 0)),
				this.qQr)
			)
				if (
					((this.fQr = TimerSystem_1.TimerSystem.Delay(() => {
						this.HideWeapon(-1, !0, !0), (this.fQr = void 0);
					}, 1e3 * this.bQr)),
					(this.dQr = t),
					(this.CQr = 0) < t || !e)
				)
					for (const e of this.mQr.CharacterWeapons)
						this.X9o(e, e.NormalSocket, this.BQr, 0 < t), this.tXr(e, !1);
				else {
					for (const e of this.mQr.CharacterWeapons)
						e.WeaponHidden || this.tXr(e, !0);
					this.gQr = TimerSystem_1.TimerSystem.Delay(() => {
						this.gQr = void 0;
						for (const e of this.mQr.CharacterWeapons)
							(e.BattleEffectId =
								this.Hte.Actor.CharRenderingComponent.AddMaterialControllerData(
									this.Hte.Actor.WeaponInEffect,
								)),
								this.X9o(e, e.NormalSocket, this.BQr, 0 < t),
								this.tXr(e, !1);
					}, 100);
				}
			else
				for (const e of this.mQr.CharacterWeapons)
					this.X9o(e, e.NormalSocket, this.BQr, 0 < t), this.tXr(e, !0);
	}
	WeaponIn(e, t = 0) {
		0 !== this.BPr && this.WeaponInInternal(e, t);
	}
	OldWeaponHidden() {
		if (this.Hte) {
			this.gQr &&
				(TimerSystem_1.TimerSystem.Remove(this.gQr), (this.gQr = void 0));
			for (const e of this.mQr.CharacterWeapons) this.tXr(e, !0);
		}
	}
	WeaponOutInternal(e = 0) {
		if (((this.BPr = 1), this.Hte)) {
			this.gQr &&
				(TimerSystem_1.TimerSystem.Remove(this.gQr), (this.gQr = void 0)),
				this.fQr &&
					(TimerSystem_1.TimerSystem.Remove(this.fQr), (this.fQr = void 0)),
				0 < (this.dQr = e) && (this.CQr = 0);
			for (const t of this.mQr.CharacterWeapons)
				this.X9o(t, t.BattleSocket, this.BQr, 0 < e),
					this.tXr(t, !1),
					t.BattleEffectId &&
						(this.Hte.Actor.CharRenderingComponent.RemoveMaterialControllerData(
							t.BattleEffectId,
						),
						(t.BattleEffectId = 0));
		}
	}
	WeaponOut(e = 0) {
		1 !== this.BPr && this.WeaponOutInternal(e);
	}
	X9o(e, t, i, r) {
		var a = this.Hte.Actor.Mesh.GetSocketTransform(t, 0);
		i.SetScale3D(this.wQr.ToUeVector()),
			r &&
				((e.LerpStartTransform = UE.KismetMathLibrary.ComposeTransforms(
					e.Mesh.K2_GetComponentToWorld(),
					a.Inverse(),
				)),
				e.LerpStartTransform.SetScale3D(this.wQr.ToUeVector()),
				(e.LerpEndTransform = i)),
			e.Mesh.K2_AttachToComponent(this.Hte.Actor.Mesh, t, 0, 0, 0, !0),
			r
				? e.Mesh.K2_SetRelativeTransform(e.LerpStartTransform, !1, void 0, !0)
				: e.Mesh.K2_SetRelativeTransform(i, !1, void 0, !0);
	}
	ChangeWeaponHangState(e, t, i, r) {
		if (this.BPr !== e)
			switch (e) {
				case 0:
					this.WeaponIn(!1, r);
					break;
				case 1:
					this.WeaponOut(r);
					break;
				default:
					if (
						((this.BPr = e),
						this.gQr &&
							(TimerSystem_1.TimerSystem.Remove(this.gQr), (this.gQr = void 0)),
						this.fQr &&
							(TimerSystem_1.TimerSystem.Remove(this.fQr), (this.fQr = void 0)),
						t.Num() !== this.mQr.CharacterWeapons.length ||
							i.Num() !== this.mQr.CharacterWeapons.length)
					)
						return (
							Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Character",
									6,
									"切换武器挂载需要与本身武器部件数量一样的输入数据",
									["Char", this.Hte.Actor.GetName()],
								),
							!1
						);
					0 < (this.dQr = r) && (this.CQr = 0);
					{
						let e = 0;
						for (const a of this.mQr.CharacterWeapons)
							this.X9o(a, t.Get(e), i.Get(e), 0 < r),
								this.tXr(a, !1),
								a.BattleEffectId &&
									(this.Hte.Actor.CharRenderingComponent.RemoveMaterialControllerData(
										a.BattleEffectId,
									),
									(a.BattleEffectId = 0)),
								++e;
					}
			}
		return !0;
	}
	HideWeapon(e, t, i, r = !1, a = 0) {
		this.vQr.push(new HideWeaponOrder(e, t, i, r, a));
	}
	OQr() {
		for (const e of this.vQr) e.WithEffect = !1;
	}
	oXr() {
		if (this.mQr?.CharacterWeapons)
			for (const e of this.mQr.CharacterWeapons)
				e.SetBuffEffectsHiddenInGame(e.WeaponHidden);
	}
	tXr(e, t, i = !0, r = !0, a = 0) {
		return (
			(r =
				(0 === this.BPr && 0 < this.QQr.size) ||
				e.VisibleHelper.RequestAndUpdateHiddenInGame(t, r, a)) !==
				e.WeaponHidden &&
			(t && r && e.ReleaseHideEffect(),
			e.Mesh.SetHiddenInGame(r, !0),
			r &&
				e.Mesh instanceof UE.SkeletalMeshComponent &&
				((a = e.Mesh.GetAnimInstance()),
				UE.KuroAnimLibrary.EndAnimNotifyStates(a)),
			(a = e.WeaponHidden),
			(e.WeaponHidden = r),
			t && r && i && !a && e.ShowHideEffect(),
			e.SetBuffEffectsHiddenInGame(t && r),
			!0)
		);
	}
	RegisterCharacterDropWeaponEvent(e) {
		(this.AiWeaponConfigId = e),
			(this.CacheAiSocketItem =
				ModelManager_1.ModelManager.AiWeaponModel.GetWeaponConfigByConfigId(
					e,
					this.Entity,
				)),
			this.uXr(this.CacheAiSocketItem.Tag),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
				this.z3r,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
				this.$Qr,
			);
	}
	UnRegisterCharacterDropWeaponEvent() {
		this.AiWeaponConfigId &&
			0 !== this.AiWeaponConfigId &&
			((this.CacheAiSocketItem =
				ModelManager_1.ModelManager.AiWeaponModel.GetWeaponConfigByConfigId(
					this.AiWeaponConfigId,
					this.Entity,
				)),
			this.cXr(this.CacheAiSocketItem.Tag),
			(this.AiWeaponConfigId = 0),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
				this.z3r,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
				this.$Qr,
			));
	}
	ReceiveCharacterKnockUpDropWeapon() {
		ModelManager_1.ModelManager.AiWeaponModel.Net.SendDiscardWeaponPush(this);
	}
	YQr() {
		0 !== this.AiWeaponConfigId &&
			ModelManager_1.ModelManager.AiWeaponModel.Net.SendDiscardWeaponPush(this);
	}
	uXr(e) {
		(e = e?.TagId),
			this.Lie ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Character",
						58,
						"怪物添加Tag 的TagComponent组件为初始化完成，请检查MonsterEntity的组件start顺序",
					)),
			e && !this.Lie.HasTag(e) && this.Lie.AddTag(e);
	}
	cXr(e) {
		this.Lie.Active && this.Lie.RemoveTag(e?.TagId);
	}
	get HasWeapon() {
		return 1 === this.BPr;
	}
	ResetWeaponTag() {
		(this.CacheAiSocketItem =
			ModelManager_1.ModelManager.AiWeaponModel.GetWeaponConfigByConfigId(
				this.AiWeaponConfigId,
				this.Entity,
			)),
			this.CacheAiSocketItem && this.uXr(this.CacheAiSocketItem.Tag);
	}
	GetWeaponBreachLevel() {
		return this.WeaponEquipInfo ? this.WeaponEquipInfo.WeaponBreachLevel : -1;
	}
	InitWeaponVisibleData() {
		var e =
			ConfigManager_1.ConfigManager.WeaponComponentConfig.GetWeaponVisibleConfig(
				this.Entity,
			);
		let t = 0;
		for (const i of this.mQr.CharacterWeapons)
			i.VisibleHelper.InitBaseTable(t < e.BaseType.length ? e.BaseType[t] : 0),
				i.VisibleHelper.InitTagHelper(
					this.Lie,
					t < e.BaseType.length ? e.VisibleTags[t] : "",
					this.GQr,
					t < e.BaseType.length ? e.HiddenTags[t] : "",
					this.NQr,
				),
				t++;
	}
	d8s() {
		var e = this.Hte.CreatureData,
			t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e.GetRoleId());
		let i = 0;
		(i = t?.IsTrialRole() ? t.GetRoleId() : e.GetPbDataId()),
			(t =
				ConfigManager_1.ConfigManager.WeaponComponentConfig.GetHideWeaponTags(
					i,
				)),
			(this.DQr = []),
			t.forEach((e) => {
				(e = this.Lie.ListenForTagAddOrRemove(e, this.XQr)) && this.DQr.push(e);
			});
	}
	InitDebugWeaponVisibleDataById(e) {
		var t =
			ConfigManager_1.ConfigManager.WeaponComponentConfig.GetWeaponVisibleConfigById(
				e,
			);
		let i = 0;
		for (const e of this.mQr.CharacterWeapons)
			e.VisibleHelper.InitBaseTable(i < t.BaseType.length ? t.BaseType[i] : 0),
				e.VisibleHelper.InitTagHelper(
					this.Lie,
					i < t.BaseType.length ? t.VisibleTags[i] : "",
					this.GQr,
					i < t.BaseType.length ? t.HiddenTags[i] : "",
					this.NQr,
				),
				i++;
		this.HideWeapon(-1, !0, !1), (this.fQr = void 0);
	}
	ClearWeaponVisibleData() {
		if (this.mQr?.CharacterWeapons)
			for (const e of this.mQr.CharacterWeapons)
				e.VisibleHelper.ClearTagHelper();
	}
	SetWeaponVisibleByTag(e, t, i) {
		t
			? this.HideWeapon(e.Index, !i, !0, !1, 2)
			: this.HideWeapon(e.Index, i, !0, !1, 2);
	}
	GetCurrentWeaponEquipDebugInfo() {
		let e = "";
		e += `[武器组件]{ weaponId: ${this.WeaponEquipInfo.WeaponId}, 'WeaponBreachLevel:' ${this.WeaponEquipInfo.WeaponBreachLevel}, models:${this.WeaponEquipInfo.WeaponConfig.Models}  }\n`;
		for (const i of this.mQr.CharacterWeapons) {
			var t = i.Mesh;
			e += `[武器组件]{ weaponMesh: ${t.SkeletalMesh.GetName()}, AnimInstance: ${t.GetAnimInstance().GetName()},         BattleSocket: ${i.BattleSocket},NormalSocket: ${i.NormalSocket} }\n`;
		}
		return e;
	}
	GetWeaponMesh() {
		return this.mQr;
	}
	IsCurrentWeaponHideEffectPlaying() {
		return (
			!!EffectSystem_1.EffectSystem.IsValid(
				this.mQr?.CharacterWeapons[0]?.WeaponHideEffect ?? 0,
			) &&
			EffectSystem_1.EffectSystem.IsPlaying(
				this.mQr?.CharacterWeapons[0]?.WeaponHideEffect ?? 0,
			)
		);
	}
	rXr() {
		if (this.pQr && this.mQr?.CharacterWeapons)
			for (const e of this.mQr.CharacterWeapons)
				!e.WeaponHidden &&
				EffectSystem_1.EffectSystem.IsValid(e.WeaponHideEffect) &&
				EffectSystem_1.EffectSystem.IsPlaying(e.WeaponHideEffect)
					? this.Lie.HasTag(577301498) || this.Lie.AddTag(577301498)
					: this.Lie.HasTag(577301498) && this.Lie.RemoveTag(577301498);
	}
};
(CharacterWeaponComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(69)],
	CharacterWeaponComponent,
)),
	(exports.CharacterWeaponComponent = CharacterWeaponComponent);
