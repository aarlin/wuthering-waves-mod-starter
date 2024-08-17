"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleAudioController = void 0);
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	ControllerBase_1 = require("../../../../Core/Framework/ControllerBase"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	FormationAttributeController_1 = require("../../../Module/Abilities/FormationAttributeController"),
	STRENGTH_CHANGED_TRIGGER_INTERVAL = 8e3,
	OPEN_TREASURE_BOX_TRIGGER_INTERVAL = 1e4;
class RoleAudioController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (
			(this.Itr =
				(CommonParamById_1.configCommonParamById.GetIntConfig(
					"LowEndurancePercent",
				) ?? 0) / 1e4),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OpenTreasureBox,
				this.Ttr,
			),
			FormationAttributeController_1.FormationAttributeController.AddValueListener(
				1,
				this.Pri,
			),
			!0
		);
	}
	static OnClear() {
		return (
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OpenTreasureBox,
				this.Ttr,
			),
			FormationAttributeController_1.FormationAttributeController.RemoveValueListener(
				1,
				this.Pri,
			),
			!0
		);
	}
}
(exports.RoleAudioController = RoleAudioController),
	((_a = RoleAudioController).ActorComponent = void 0),
	(RoleAudioController.AudioComponent = void 0),
	(RoleAudioController.Itr = 0),
	(RoleAudioController.Ltr = 0),
	(RoleAudioController.Dtr = 0),
	(RoleAudioController.xie = (e, o) => {
		(_a.ActorComponent = e.Entity?.CheckGetComponent(3)),
			(_a.AudioComponent = e.Entity?.CheckGetComponent(170)),
			_a.AudioComponent?.Config &&
				AudioSystem_1.AudioSystem.SetState(
					"role_name",
					_a.AudioComponent.Config.Name,
				);
	}),
	(RoleAudioController.Ttr = () => {
		var e, o;
		Time_1.Time.Now - _a.Dtr > 1e4 &&
			((_a.Dtr = Time_1.Time.Now),
			(e = _a.ActorComponent?.Owner),
			(o = _a.AudioComponent?.Config?.OpenTreasureBoxEvent)) &&
			e &&
			(AudioSystem_1.AudioSystem.PostEvent(o, e), Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info(
				"Audio",
				57,
				"[Game.Role] PostEvent",
				["Event", o],
				["Owner", e.GetName()],
				["Reason", "OpenTreasureBox"],
			);
	}),
	(RoleAudioController.Pri = (e, o, t) => {
		1 !== e ||
			t < o ||
			ModelManager_1.ModelManager.SceneTeamModel?.ChangingRole ||
			o /
				(e =
					FormationAttributeController_1.FormationAttributeController.GetMax(
						1,
					)) >
				_a.Itr ||
			(Time_1.Time.Now - _a.Ltr > 8e3 &&
				((_a.Ltr = Time_1.Time.Now),
				(o = _a.ActorComponent?.Owner),
				(t =
					t / e > _a.Itr
						? _a.AudioComponent?.Config?.LowStrengthEventList[0]
						: _a.AudioComponent?.Config?.LowStrengthEventList[1])) &&
				o &&
				(AudioSystem_1.AudioSystem.PostEvent(t, o), Log_1.Log.CheckInfo()) &&
				Log_1.Log.Info(
					"Audio",
					57,
					"[Game.Role] PostEvent",
					["Event", t],
					["Owner", o.GetName()],
					["Reason", "StrengthChanged"],
				));
	});
