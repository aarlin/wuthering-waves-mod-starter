"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (o, t, e, r) {
		var n,
			i = arguments.length,
			c =
				i < 3
					? t
					: null === r
						? (r = Object.getOwnPropertyDescriptor(t, e))
						: r;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			c = Reflect.decorate(o, t, e, r);
		else
			for (var _ = o.length - 1; 0 <= _; _--)
				(n = o[_]) && (c = (i < 3 ? n(c) : 3 < i ? n(t, e, c) : n(t, e)) || c);
		return 3 < i && c && Object.defineProperty(t, e, c), c;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterAudioComponent = void 0);
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	SwitchRef_1 = require("../../../../../Core/Utils/Audio/SwitchRef"),
	ENTITY_TYPE_VOLUME_CONTROLS = [
		[
			Protocol_1.Aki.Protocol.wks.Proto_Animal,
			"entity_type_volume_control_animal",
		],
		[
			Protocol_1.Aki.Protocol.wks.Proto_Custom,
			"entity_type_volume_control_custom_other",
		],
		[
			Protocol_1.Aki.Protocol.wks.Proto_Monster,
			"entity_type_volume_control_monster",
		],
		[Protocol_1.Aki.Protocol.wks.Proto_Npc, "entity_type_volume_control_npc"],
		[
			Protocol_1.Aki.Protocol.wks.Proto_Player,
			"entity_type_volume_control_player_role",
		],
		[
			Protocol_1.Aki.Protocol.wks.Proto_SceneItem,
			"entity_type_volume_control_scene_item",
		],
		[
			Protocol_1.Aki.Protocol.wks.Proto_Vision,
			"entity_type_volume_control_vision",
		],
	];
let CharacterAudioComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.Priority = new SwitchRef_1.SwitchRef("char_p1orp3", "p1")),
			(this.CreatureData = void 0),
			(this.ActorComponent = void 0);
	}
	static get Dependencies() {
		return [0, 3];
	}
	OnInit() {
		return (
			(this.CreatureData = this.Entity.CheckGetComponent(0)),
			(this.ActorComponent = this.Entity.CheckGetComponent(3)),
			!0
		);
	}
	OnEnd() {
		return !0;
	}
	OnStart() {
		return !(
			!this.ActorComponent?.Valid ||
			!this.ActorComponent.Owner ||
			(this.BindGameSyncs(this.ActorComponent.Owner),
			(this.Priority.State =
				this.ActorComponent.IsRoleAndCtrlByMe ||
				this.ActorComponent.IsSummonsAndCtrlByMe
					? "p1"
					: "p3"),
			0)
		);
	}
	GetAkComponent(o) {
		var t = this.ActorComponent?.Owner;
		if (t?.IsValid())
			return AudioSystem_1.AudioSystem.GetAkComponent(t, {
				SocketName: o,
				OnCreated: (o, t) => {
					var e = this.CreatureData?.GetEntityType();
					(e !== Protocol_1.Aki.Protocol.wks.Proto_Npc &&
						e !== Protocol_1.Aki.Protocol.wks.Proto_Monster) ||
						(t.bEnableOcclusion = !0),
						this.BindGameSyncs(o),
						this.M4r();
				},
			});
	}
	BindGameSyncs(o) {
		this.Priority.Bind(o);
	}
	M4r() {
		const o = this.ActorComponent?.Owner,
			t = this.CreatureData?.GetEntityType();
		o
			? (ENTITY_TYPE_VOLUME_CONTROLS.forEach(([e, r]) => {
					(e = t === e ? 1 : 0),
						AudioSystem_1.AudioSystem.SetRtpcValue(r, e, { Actor: o });
				}),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Audio",
						56,
						"实体类型设置音量控制: SOLO此类型, 静音其他类型",
						["actor", o.GetName()],
						["entityType", t],
					))
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Audio", 56, "实体类型设置音量控制: 无法获取角色Actor");
	}
};
(CharacterAudioComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(42)],
	CharacterAudioComponent,
)),
	(exports.CharacterAudioComponent = CharacterAudioComponent);
