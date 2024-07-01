"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, i, r) {
		var n,
			s = arguments.length,
			o =
				s < 3
					? t
					: null === r
						? (r = Object.getOwnPropertyDescriptor(t, i))
						: r;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			o = Reflect.decorate(e, t, i, r);
		else
			for (var a = e.length - 1; 0 <= a; a--)
				(n = e[a]) && (o = (s < 3 ? n(o) : 3 < s ? n(t, i, o) : n(t, i)) || o);
		return 3 < s && o && Object.defineProperty(t, i, o), o;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterSkinDamageComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Time_1 = require("../../../../../Core/Common/Time"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController"),
	CharacterNameDefines_1 = require("../CharacterNameDefines"),
	SKIN_DAMAGE_TIME = 20,
	SKIN_DAMAGE_LEVEL1_COUNT = 7,
	SKIN_DAMAGE_LEVEL2_COUNT = 14;
let CharacterSkinDamageComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.SIe = void 0),
			(this.Hte = void 0),
			(this.gWr = void 0),
			(this.fWr = 0),
			(this.oOr = 0),
			(this.pWr = 0),
			(this.vWr = 0),
			(this.n8 = void 0),
			(this.MWr = void 0),
			(this.Zpe = (e) => {
				this.BCe(),
					e
						? ((this.oOr = Time_1.Time.WorldTimeSeconds), (this.pWr = 0))
						: ((this.oOr = 0),
							(this.pWr = Time_1.Time.WorldTimeSeconds),
							this.SWr()),
					(this.vWr = 0);
			}),
			(this.gne = (e) => {
				var t;
				0 !== this.oOr &&
					(this.vWr++, (t = Time_1.Time.WorldTimeSeconds - this.oOr) > 20) &&
					(this.vWr > 14
						? this.EWr(
								2,
								"加载2级战损贴图（受击）",
								["battleStartDuration", t],
								["BeHitCount", this.vWr],
							)
						: this.vWr > 7 &&
							this.EWr(
								1,
								"加载1级战损贴图（受击）",
								["battleStartDuration", t],
								["BeHitCount", this.vWr],
							));
			}),
			(this.fKe = () => {
				FormationDataController_1.FormationDataController.GlobalIsInFight &&
					this.EWr(2, "加载2级战损贴图（复活）");
			}),
			(this.Gfr = () => {
				this.EWr(0, "战损恢复（传送）");
			}),
			(this.bkt = (e) => {
				e === this.Entity.Id &&
					0 !== this.pWr &&
					Time_1.Time.WorldTimeSeconds - this.pWr > 20 &&
					this.EWr(0, "战损恢复（下场）");
			});
	}
	OnStart() {
		return (
			(this.SIe = this.Entity.CheckGetComponent(0)),
			(this.Hte = this.Entity.CheckGetComponent(3)),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnBattleStateChanged,
				this.Zpe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRoleGoDown,
				this.bkt,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharBeHitLocal,
				this.gne,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnRevive,
				this.fKe,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.TeleportStartEntity,
				this.Gfr,
			),
			!0
		);
	}
	OnEnd() {
		return (
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnBattleStateChanged,
				this.Zpe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRoleGoDown,
				this.bkt,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharBeHitLocal,
				this.gne,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnRevive,
				this.fKe,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.TeleportStartEntity,
				this.Gfr,
			),
			this.BCe(),
			!0
		);
	}
	yWr() {
		(this.gWr = this.Hte.Actor.GetComponentByClass(
			UE.KuroChangeSkeletalMaterialsComponent.StaticClass(),
		)),
			this.gWr?.IsValid() ||
				(this.gWr = this.Hte.Actor.AddComponentByClass(
					UE.KuroChangeSkeletalMaterialsComponent.StaticClass(),
					!1,
					MathUtils_1.MathUtils.DefaultTransform,
					!1,
					CharacterNameDefines_1.CharacterNameDefines
						.CHANGE_SKELETAL_MATERIALS_COMP_NAME,
				));
	}
	BCe() {
		this.MWr &&
			(TimerSystem_1.TimerSystem.Remove(this.MWr), (this.MWr = void 0));
	}
	SWr() {
		this.MWr = TimerSystem_1.TimerSystem.Delay(() => {
			(this.MWr = void 0),
				ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Id !==
					this.Entity.Id && this.EWr(0, "战损恢复（定时器）");
		}, 20);
	}
	IWr(e) {
		return this.SIe.GetRoleConfig()?.SkinDamage[e];
	}
	TWr(e) {
		(this.n8 = this.IWr(e)),
			this.n8 &&
				ResourceSystem_1.ResourceSystem.LoadAsync(
					this.n8,
					UE.KuroChangeMaterialsTextures,
					(e, t) => {
						this.Entity?.Valid &&
							this.Hte.Actor?.IsValid() &&
							t === this.n8 &&
							(this.gWr?.IsValid() || this.yWr(),
							Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug("Battle", 29, "战损贴图生效", ["path", t]),
							this.gWr?.ChangeMaterialsWithDataAsset(e));
					},
				);
	}
	EWr(e, t, ...i) {
		this.fWr !== e &&
			((this.fWr = e),
			Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 29, t, ...i),
			this.TWr(this.fWr));
	}
};
(CharacterSkinDamageComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(188)],
	CharacterSkinDamageComponent,
)),
	(exports.CharacterSkinDamageComponent = CharacterSkinDamageComponent);
