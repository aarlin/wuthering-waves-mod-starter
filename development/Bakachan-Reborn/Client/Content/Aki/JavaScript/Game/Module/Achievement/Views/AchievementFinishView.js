"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AchievementFinishView = void 0);
const UE = require("ue"),
	Time_1 = require("../../../../Core/Common/Time"),
	TickSystem_1 = require("../../../../Core/Tick/TickSystem"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	CLOSE_TIMER_DOWN = 4e3;
class AchievementFinishView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.iqe = void 0),
			(this.Rqe = TickSystem_1.TickSystem.InvalidId),
			(this.Uqe = 0),
			(this.J_ = () => {
				(this.Uqe += Time_1.Time.DeltaTime),
					this.Uqe >= 4e3 && (this.CloseMe(), this.jm());
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIText],
		];
	}
	OnBeforeShow() {
		var e =
			ModelManager_1.ModelManager.AchievementModel.CurrentFinishAchievementArray.shift();
		(this.iqe =
			ModelManager_1.ModelManager.AchievementModel.GetAchievementData(e)),
			this.Aqe(),
			this.Pqe(),
			this.jm(),
			(this.Rqe = TickSystem_1.TickSystem.Add(
				this.J_,
				"Achievement",
				0,
				!0,
			).Id);
	}
	Aqe() {
		var e = this.iqe.GetGroupId();
		e = ModelManager_1.ModelManager.AchievementModel.GetAchievementGroupData(e);
		StringUtils_1.StringUtils.IsEmpty(e.GetTexture()) ||
			this.SetTextureByPath(e.GetTexture(), this.GetTexture(0));
	}
	Pqe() {
		this.GetText(1).SetText(this.iqe.GetTitle());
	}
	jm() {
		(this.Uqe = 0),
			this.Rqe !== TickSystem_1.TickSystem.InvalidId &&
				(TickSystem_1.TickSystem.Remove(this.Rqe),
				(this.Rqe = TickSystem_1.TickSystem.InvalidId));
	}
	OnBeforeDestroy() {
		this.jm();
	}
}
exports.AchievementFinishView = AchievementFinishView;
