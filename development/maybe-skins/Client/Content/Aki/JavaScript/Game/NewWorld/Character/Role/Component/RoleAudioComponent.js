"use strict";
var RoleAudioComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, o, n) {
			var i,
				r = arguments.length,
				a =
					r < 3
						? t
						: null === n
							? (n = Object.getOwnPropertyDescriptor(t, o))
							: n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				a = Reflect.decorate(e, t, o, n);
			else
				for (var s = e.length - 1; 0 <= s; s--)
					(i = e[s]) &&
						(a = (r < 3 ? i(a) : 3 < r ? i(t, o, a) : i(t, o)) || a);
			return 3 < r && a && Object.defineProperty(t, o, a), a;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleAudioComponent = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
	Info_1 = require("../../../../../Core/Common/Info"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Time_1 = require("../../../../../Core/Common/Time"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	SwitchRef_1 = require("../../../../../Core/Utils/Audio/SwitchRef"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	Global_1 = require("../../../../Global"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	GameAudioController_1 = require("../../../../Module/Audio/GameAudioController"),
	CharacterAttributeTypes_1 = require("../../Common/Component/Abilities/CharacterAttributeTypes"),
	CharacterAudioComponent_1 = require("../../Common/Component/CharacterAudioComponent"),
	VoxelUtils_1 = require("../../../../Utils/VoxelUtils"),
	MOVE_STATE_TAGS = [
		["fly", -1717024120],
		["fall", -1527053051],
		["highspeed", -742314429],
		["sit", -1446183172],
		["slide", 786967831],
	],
	SKILL_EVENT_MAP = new Map([
		[100020, "play_role_commonskl_gousuo_target_start"],
		[100021, "play_role_commonskl_gousuo_target_start"],
		[100022, "play_amb_interact_suiguang_gousuo_target_start"],
	]),
	TICK_INTERVAL = 250,
	LOCATION_TOLERANCE = 32,
	MATERIAL_ID_SHR = 14;
let RoleAudioComponent = (RoleAudioComponent_1 = class extends (
	CharacterAudioComponent_1.CharacterAudioComponent
) {
	constructor() {
		super(...arguments),
			(this.Config = void 0),
			(this.RoleName = new SwitchRef_1.SwitchRef("role_name", "chixia")),
			(this.FootstepTexture = new SwitchRef_1.SwitchRef(
				"footstep_ground_texture",
				"DirtSurface",
			)),
			(this.Xte = void 0),
			(this.$te = void 0),
			(this.YKe = (e, t, o) => {
				if (this.Active && e === this.Entity.Id && !(o < t)) {
					e = this.ActorComponent?.Owner;
					var n = this.Config?.LostHealthEventMap,
						i = this.$te?.GetCurrentValue(
							CharacterAttributeTypes_1.EAttributeId.Tkn,
						);
					if (e && n && i) {
						var r,
							a,
							s = (t / i) * 100,
							l = (o / i) * 100;
						let m = 100,
							u = "";
						for ([r, a] of n) s > r || l < r || (m > r && ((m = r), (u = a)));
						u &&
							(AudioSystem_1.AudioSystem.PostEvent(u, e),
							Log_1.Log.CheckInfo()) &&
							Log_1.Log.Info(
								"Audio",
								57,
								"[Game.Role] PostEvent",
								["Event", u],
								["Owner", e.GetName()],
								["Reason", "HealthChanged"],
							);
					}
				}
			}),
			(this.ooo = (e, t) => {
				var o = this.ActorComponent?.Owner;
				t = SKILL_EVENT_MAP.get(t);
				o?.IsValid() && t && AudioSystem_1.AudioSystem.PostEvent(t, o);
			});
	}
	OnInit() {
		return (
			super.OnInit(),
			this.cRr(),
			(this.Xte = this.Entity.CheckGetComponent(185)),
			(this.$te = this.Entity.CheckGetComponent(156)),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CharOnHealthChanged,
				this.YKe,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharUseSkill,
				this.ooo,
			),
			!0
		);
	}
	OnEnd() {
		return (
			super.OnEnd(),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CharOnHealthChanged,
				this.YKe,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharUseSkill,
				this.ooo,
			),
			!0
		);
	}
	BindGameSyncs(e) {
		super.BindGameSyncs(e), this.RoleName.Bind(e), this.FootstepTexture.Bind(e);
	}
	OnStart() {
		return (
			super.OnStart(),
			(this.RoleName.State = this.Config?.Name ? this.Config.Name : "chixia"),
			!0
		);
	}
	OnTick(e) {
		this.Entity.Id === Global_1.Global.BaseCharacter?.EntityId &&
			Time_1.Time.Now - RoleAudioComponent_1.I$t > 250 &&
			((RoleAudioComponent_1.I$t = Time_1.Time.Now), this.C3r(), this.zin());
	}
	cRr() {
		var e, t;
		this.CreatureData?.Valid &&
			ModelManager_1.ModelManager.RoleModel &&
			((e = this.CreatureData.GetPbDataId()),
			(t = (t =
				ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e))?.IsTrialRole()
				? t.GetRoleId()
				: e),
			(this.Config =
				ConfigManager_1.ConfigManager.AudioConfig?.GetRoleConfig(t)));
	}
	C3r() {
		let e = "normal";
		for (var [t, o] of MOVE_STATE_TAGS)
			if (this.Xte?.HasTag(o)) {
				e = t;
				break;
			}
		RoleAudioComponent_1.Zin !== e &&
			((RoleAudioComponent_1.Zin = e),
			AudioSystem_1.AudioSystem.SetState("role_move", e));
	}
	zin() {
		var e;
		this.ActorComponent?.Valid &&
			!this.ActorComponent.ActorLocationProxy.Equals(
				RoleAudioComponent_1.U7o,
				32,
			) &&
			(RoleAudioComponent_1.U7o.DeepCopy(
				this.ActorComponent.ActorLocationProxy,
			),
			(e = this.ActorComponent.ActorLocation),
			GameAudioController_1.GameAudioController.UpdatePlayerLocation(e),
			14 ===
				VoxelUtils_1.VoxelUtils.GetVoxelInfo(Info_1.Info.World, e).MtlID) &&
			AudioSystem_1.AudioSystem.PostEvent(
				"play_amb_role_interact_shr",
				new UE.Transform(e),
			);
	}
});
(RoleAudioComponent.I$t = 0),
	(RoleAudioComponent.Zin = "normal"),
	(RoleAudioComponent.U7o = Vector_1.Vector.Create()),
	(RoleAudioComponent = RoleAudioComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(170)],
			RoleAudioComponent,
		)),
	(exports.RoleAudioComponent = RoleAudioComponent);
