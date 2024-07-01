"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, i, n) {
		var s,
			o = arguments.length,
			r =
				o < 3
					? t
					: null === n
						? (n = Object.getOwnPropertyDescriptor(t, i))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			r = Reflect.decorate(e, t, i, n);
		else
			for (var a = e.length - 1; 0 <= a; a--)
				(s = e[a]) && (r = (o < 3 ? s(r) : 3 < o ? s(t, i, r) : s(t, i)) || r);
		return 3 < o && r && Object.defineProperty(t, i, r), r;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiRoleHuluLightSequenceComponent = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	CharacterNameDefines_1 = require("../../../../NewWorld/Character/Common/CharacterNameDefines"),
	UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
	UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiRoleHuluLightSequenceComponent = class extends UiModelComponentBase_1.UiModelComponentBase {
	constructor() {
		super(...arguments),
			(this.nXt = void 0),
			(this.EPe = void 0),
			(this.Bkt = void 0),
			(this.hJ = ResourceSystem_1.ResourceSystem.InvalidId),
			(this.$wr = (e) => {
				e || this.StopLightSequence();
			});
	}
	OnInit() {
		this.nXt = this.Owner.CheckGetComponent(1);
	}
	OnStart() {
		EventSystem_1.EventSystem.AddWithTarget(
			this.Owner,
			EventDefine_1.EEventName.OnUiModelVisibleChange,
			this.$wr,
		);
	}
	FBr() {
		var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
			"LevelSequence_HuluLight",
		);
		this.hJ = ResourceSystem_1.ResourceSystem.LoadAsync(
			e,
			UE.LevelSequence,
			(e) => {
				var t;
				ObjectUtils_1.ObjectUtils.IsValid(e) &&
					(((t = new UE.MovieSceneSequencePlaybackSettings()).bRestoreState =
						!0),
					(t.bPauseAtEnd = !0),
					(this.Bkt = ActorSystem_1.ActorSystem.Get(
						UE.LevelSequenceActor.StaticClass(),
						MathUtils_1.MathUtils.DefaultTransform,
						void 0,
						!1,
					)),
					(this.Bkt.PlaybackSettings = t),
					this.Bkt.SetSequence(e),
					(this.EPe = this.Bkt.SequencePlayer),
					this.EPe) &&
					this.PlayLightSequence();
			},
		);
	}
	PlayLightSequence() {
		var e, t;
		this.EPe
			? ((this.Bkt.bOverrideInstanceData = !0),
				(e = this.Bkt.DefaultInstanceData),
				(t = this.nXt.MainMeshComponent.GetSocketTransform(
					CharacterNameDefines_1.CharacterNameDefines.GLIDEING_SOCKETNAME,
				)),
				(t = new UE.Transform(t.GetLocation())),
				(e.TransformOrigin = t),
				this.EPe.Play())
			: this.hJ === ResourceSystem_1.ResourceSystem.InvalidId && this.FBr();
	}
	StopLightSequence() {
		this.EPe
			? this.EPe.Stop()
			: this.hJ !== ResourceSystem_1.ResourceSystem.InvalidId &&
				(ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.hJ),
				(this.hJ = ResourceSystem_1.ResourceSystem.InvalidId));
	}
	OnEnd() {
		EventSystem_1.EventSystem.RemoveWithTarget(
			this.Owner,
			EventDefine_1.EEventName.OnUiModelVisibleChange,
			this.$wr,
		),
			this.StopLightSequence();
		const e = this.Bkt;
		TimerSystem_1.TimerSystem.Next(() => {
			ActorSystem_1.ActorSystem.Put(e);
		}),
			(this.EPe = void 0),
			(this.Bkt = void 0);
	}
};
(UiRoleHuluLightSequenceComponent = __decorate(
	[(0, UiModelComponentDefine_1.RegisterUiModelComponent)(17)],
	UiRoleHuluLightSequenceComponent,
)),
	(exports.UiRoleHuluLightSequenceComponent = UiRoleHuluLightSequenceComponent);
