"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkillCdController = void 0);
const Stats_1 = require("../../../Core/Common/Stats"),
	Time_1 = require("../../../Core/Common/Time"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../Core/Net/Net"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	VisibleStateUtil_1 = require("../BattleUi/VisibleStateUtil");
class SkillCdController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (
			Net_1.Net.Register(13391, this.ZWe),
			Net_1.Net.Register(3960, this.eKe),
			!0
		);
	}
	static OnClear() {
		return Net_1.Net.UnRegister(13391), Net_1.Net.UnRegister(3960), !0;
	}
	static OnTick(e) {
		this.IsPause() ||
			ModelManager_1.ModelManager.SkillCdModel.Tick(
				e * Time_1.Time.TimeDilation,
			);
	}
	static Pause(e, t) {
		this.IsPause() !==
			(t =
				((this.tKe = VisibleStateUtil_1.VisibleStateUtil.SetVisible(
					this.tKe,
					!t,
					e,
				)),
				this.IsPause())) &&
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.CharSkillCdPauseStateChanged,
				t,
			);
	}
	static IsPause() {
		return 0 !== this.tKe;
	}
}
((exports.SkillCdController = SkillCdController).gW = void 0),
	(SkillCdController.tKe = 0),
	(SkillCdController.ZWe = (e) => {
		ModelManager_1.ModelManager.SkillCdModel?.HandlePlayerSkillInfoPbNotify(e);
	}),
	(SkillCdController.eKe = (e) => {
		ModelManager_1.ModelManager.SkillCdModel?.HandlePassiveSkillNotify(e);
	});
