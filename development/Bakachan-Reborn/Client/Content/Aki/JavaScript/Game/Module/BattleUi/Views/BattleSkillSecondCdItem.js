"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleSkillSecondCdItem = void 0);
const UE = require("ue"),
	Time_1 = require("../../../../Core/Common/Time"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	SkillCdController_1 = require("../../Battle/SkillCdController"),
	AMOUNT_START = 0.3,
	AMOUNT_SCALE = 0.4;
class BattleSkillSecondCdItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Xy = 0),
			(this.sit = void 0),
			(this.zet = void 0),
			(this.Zet = 0),
			(this.ett = 0);
	}
	SetIndex(t) {
		this.Xy = t;
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UISprite]];
	}
	OnStart() {
		(this.zet = this.GetSprite(0)),
			this.RootItem?.SetUIRelativeRotation(new UE.Rotator(0, 90 * this.Xy, 0));
	}
	RefreshSkillCoolDown(t) {
		(this.sit = t),
			this.sit
				? (this.xtt() && this.wtt()) ||
					(this.Btt() && this.btt()) ||
					(this.sit.IsMultiStageSkill() && this.ait()) ||
					this.qtt()
				: this.hit();
	}
	Tick(t) {
		this.Ptt(t);
	}
	Ott(t, i) {
		t <= (this.Zet = 0)
			? this.hit()
			: ((this.Zet = t), (this.ett = i), this.IsShowOrShowing || this.Show());
	}
	hit() {
		this.IsShowOrShowing && this.Hide(), (this.Zet = 0);
	}
	Ptt(t) {
		this.Zet <= 0 ||
			this.ett <= 0 ||
			!this.zet ||
			SkillCdController_1.SkillCdController.IsPause() ||
			Time_1.Time.TimeDilation <= 0 ||
			((this.Zet -=
				t * Time_1.Time.TimeDilation * TimeUtil_1.TimeUtil.Millisecond),
			this.Zet < 0
				? ((this.Zet = 0), this.zet.SetFillAmount(0), this.hit())
				: ((t = 0.3 + 0.4 * (t = this.Zet / this.ett)),
					this.zet.SetFillAmount(t)));
	}
	xtt() {
		return 7 === this.sit?.GetButtonType() && this.sit.IsSkillInItemUseBuffCd();
	}
	wtt() {
		var [t, i] = this.sit.GetEquippedItemUsingBuffCd();
		return 0 < t && (this.Ott(t, i), !0);
	}
	Btt() {
		return (
			7 === this.sit?.GetButtonType() && this.sit.IsSkillInItemUseSkillCd()
		);
	}
	btt() {
		var [t, i] = this.sit.GetEquippedItemUsingSkillCd();
		return 0 < t && (this.Ott(t, i), !0);
	}
	ait() {
		var t,
			i = this.sit.GetMultiSkillInfo();
		return !(
			!i ||
			0 === i.NextSkillId ||
			((t = i.RemainingStartTime),
			(i = i.StartTime),
			0 < t ? this.Ott(t, i) : this.hit(),
			0)
		);
	}
	qtt() {
		var t,
			i = this.sit.GetGroupSkillCdInfo();
		i && ((t = i.CurRemainingCd), (i = i.CurMaxCd), this.Ott(t, i));
	}
}
exports.BattleSkillSecondCdItem = BattleSkillSecondCdItem;
